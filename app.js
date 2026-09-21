document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL EFFECT ON HEADER
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MOBILE MENU DRAWER TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
            
            // Toggle hamburger icon state
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close mobile menu when a nav link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // 3. FAQ ACCORDION TOGGLES
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        if (questionButton) {
            questionButton.addEventListener('click', () => {
                // Toggle active state of current clicked item
                const isActive = item.classList.contains('active');
                
                // Close all other open items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't already active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 4. INTERACTIVE RFQ FORM LOGIC (AUTO-COPY TEXT & REDIRECT TO LINE)
    const rfqForm = document.getElementById('rfqForm');
    if (rfqForm) {
        rfqForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const carBrand = document.getElementById('carBrand').value;
            const carModel = document.getElementById('carModel').value;
            const partCategory = document.getElementById('partCategory').value;
            const additionalNotes = document.getElementById('additionalNotes').value;
            
            // Format Thai category names for message
            const categoryNames = {
                Suspension: "ระบบช่วงล่าง (โช้คอัพ, บูช, ลูกหมาก)",
                Braking: "ระบบเบรก (ผ้าเบรก, จานเบรก)",
                Clutch: "ระบบคลัตช์ (แผ่นคลัตช์, หวีคลัตช์)",
                Lubricants: "น้ำมันเครื่อง / น้ำมันเกียร์",
                Bearings: "ตลับลูกปืนล้อ / ลูกปืนเกียร์",
                Electrical: "ระบบไฟ / แบตเตอรี่",
                Other: "ชิ้นส่วนอื่น ๆ"
            };

            const selectedCatText = categoryNames[partCategory] || partCategory;
            
            // Build the query message text
            const textToCopy = `สวัสดีครับ สนใจสอบถามราคาอะไหล่ตรงรุ่นครับ\n-------------------------------\n🚗 ยี่ห้อรถ: ${carBrand}\n🚙 รุ่น/ปี/เลขตัวถัง: ${carModel}\n⚙️ ประเภทชิ้นส่วน: ${selectedCatText}\n📝 รายละเอียดเพิ่มเติม: ${additionalNotes || 'ไม่มี'}\n-------------------------------`;
            
            // Attempt to copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show custom elegant alert/toast
                showToast("คัดลอกรายละเอียดอะไหล่ไปยังคลิปบอร์ดแล้ว! กำลังเปิด LINE ของร้านเพื่อวางส่ง...", "success");
                
                // Open Line link in a new window after a brief delay
                setTimeout(() => {
                    window.open('https://line.me/ti/p/~@joj9586w', '_blank');
                }, 1500);
            }).catch(err => {
                // Fallback if clipboard API fails
                alert("ระบบคัดลอกล้มเหลว แต่คุณสามารถพิมพ์รายละเอียดนี้เพื่อส่งต่อทาง LINE:\n\n" + textToCopy);
                window.open('https://line.me/ti/p/~@joj9586w', '_blank');
            });
        });
    }

    // Helper function to create and show premium toast notifications
    function showToast(message, type = 'info') {
        // Remove existing toast if present
        const existingToast = document.querySelector('.custom-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast element
        const toast = document.createElement('div');
        toast.className = `custom-toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">✅</span>
                <span class="toast-message">${message}</span>
            </div>
        `;
        
        // Style toast programmatically
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '120px',
            right: '32px',
            backgroundColor: '#1F2937',
            border: '1px solid #C5A880',
            color: '#FFFFFF',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(197, 168, 128, 0.15)',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.3s ease',
            fontFamily: 'Prompt, sans-serif',
            maxWidth: '380px'
        });

        // Add to DOM
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        // Animate out and remove after 4 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }
});
