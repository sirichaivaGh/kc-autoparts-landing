document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Toggle icon between menu and close
            const icon = menuToggle.querySelector('i');
            if (icon) {
                const currentIcon = icon.getAttribute('data-lucide');
                if (currentIcon === 'menu') {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons({ nameList: ['menu', 'x'] });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons({ nameList: ['menu'] });
                }
            }
        });

        // Close menu when clicking link items
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons({ nameList: ['menu'] });
                }
            });
        });
    }

    // 3. Smooth Scroll and Navigation Link Active State on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for fixed header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.nav-list a.active')?.classList.remove('active');
                    navLink.classList.add('active');
                }
            }
        });
        
        // Special case: At the very top
        if (scrollY < 100) {
            document.querySelector('.nav-list a.active')?.classList.remove('active');
            document.querySelector('.nav-list a[href="#"]')?.classList.add('active');
        }
    });

    // 4. Header Scroll Style Modifier
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 5. Clipboard Copy Functionality with Toast Notification
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toastContainer = document.getElementById('copyToast');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.getAttribute('data-copy');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast();
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    fallbackCopyTextToClipboard(textToCopy);
                });
            } else {
                fallbackCopyTextToClipboard(textToCopy);
            }
        });
    });

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showToast();
        } catch (err) {
            console.error('Fallback failed: ', err);
        }
        document.body.removeChild(textArea);
    }

    function showToast() {
        if (toastContainer) {
            toastContainer.classList.add('show');
            setTimeout(() => {
                toastContainer.classList.remove('show');
            }, 3000);
        }
    }
});
