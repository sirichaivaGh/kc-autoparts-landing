// Car Parts Catalog - Application Logic

// 1. Data Definition for the 8 Categories
const categories = [
    {
        id: "engine",
        title: "ระบบเครื่องยนต์",
        titleEn: "Engine System",
        tag: "Engine",
        desc: "หัวใจหลักในการขับเคลื่อนรถยนต์ ทำหน้าที่แปลงพลังงานจากการเผาไหม้เชื้อเพลิงเป็นพลังงานกลเพื่อสร้างกำลังแรงบิดส่งต่อไปยังระบบเกียร์และล้อ",
        img: "assets/images/engine_system.jpg",
        parts: [
            "ลูกสูบ (Piston)",
            "เสื้อสูบ (Engine Block)",
            "ฝาสูบ (Cylinder Head)",
            "เพลาข้อเหวี่ยง (Crankshaft)",
            "เพลาลูกเบี้ยว (Camshaft)",
            "วาล์วไอดี/ไอเสีย (Intake & Exhaust Valves)"
        ],
        keywords: ["เครื่องยนต์", "สูบ", "ลูกสูบ", "เครื่อง", "วาล์ว", "ฝาสูบ", "เพลา", "engine", "piston", "crankshaft"]
    },
    {
        id: "suspension",
        title: "ระบบช่วงล่าง",
        titleEn: "Suspension System",
        tag: "Suspension",
        desc: "ระบบรองรับน้ำหนัก ซับแรงสั่นสะเทือนจากพื้นผิวถนน และยึดเกาะพื้นผิวถนน เพื่อเพิ่มความนุ่มนวลและควบคุมทิศทางอย่างแม่นยำขณะเลี้ยว",
        img: "assets/images/suspension_system.jpg",
        parts: [
            "โช้คอัพ (Shock Absorber)",
            "คอยล์สปริง (Coil Spring)",
            "ปีกนกบน/ล่าง (Control Arms)",
            "ลูกหมากปีกนก (Ball Joint)",
            "เหล็กกันโคลง (Anti-roll Bar)",
            "บูชยางรองแท่นเครื่อง (Bushings)"
        ],
        keywords: ["ช่วงล่าง", "โช้ค", "สปริง", "ปีกนก", "ลูกหมาก", "กันโคลง", "บูช", "suspension", "shock", "spring"]
    },
    {
        id: "braking",
        title: "ระบบเบรก",
        titleEn: "Braking System",
        tag: "Braking",
        desc: "ระบบควบคุมความเร็วและความปลอดภัยของรถ ทำหน้าที่ชะลอความเร็วหรือหยุดรถด้วยการใช้แรงเสียดทานกดผ้าเบรกกับจานหมุน",
        img: "assets/images/braking_system.jpg",
        parts: [
            "จานเบรก (Brake Disc/Rotor)",
            "ผ้าเบรก (Brake Pads)",
            "คาลิปเปอร์เบรก (Brake Caliper)",
            "แม่ปั๊มเบรก (Master Cylinder)",
            "สายอ่อนเบรก (Brake Lines)",
            "น้ำมันเบรก (Brake Fluid)"
        ],
        keywords: ["เบรก", "จานเบรก", "ผ้าเบรก", "คาลิปเปอร์", "ปั๊มเบรก", "น้ำมันเบรก", "braking", "disc", "pad", "caliper"]
    },
    {
        id: "clutch",
        title: "ระบบคลัตช์",
        titleEn: "Clutch System",
        tag: "Clutch",
        desc: "ชิ้นส่วนสำคัญในระบบส่งกำลัง ทำหน้าที่เชื่อมต่อและตัดการส่งกำลังแรงบิดจากเครื่องยนต์ไปยังชุดเกียร์ เพื่อความนุ่มนวลในการเปลี่ยนเกียร์",
        img: "assets/images/clutch_system.jpg",
        parts: [
            "แผ่นคลัตช์ (Clutch Disc)",
            "หวีคลัตช์ / จานกดคลัตช์ (Pressure Plate)",
            "ลูกปืนกดคลัตช์ (Release Bearing)",
            "แม่ปั๊มคลัตช์บน/ล่าง (Master & Slave Cylinder)",
            "ล้อตุนกำลัง (Flywheel)"
        ],
        keywords: ["คลัตช์", "หวีคลัตช์", "ลูกปืนคลัตช์", "ฟลายวีล", "ส่งกำลัง", "clutch", "flywheel", "plate"]
    },
    {
        id: "lighting",
        title: "ระบบไฟและแสงสว่าง",
        titleEn: "Electrical & Lighting",
        tag: "Lighting & Elec",
        desc: "ระบบจัดเก็บกระแสไฟ จ่ายพลังงาน และส่องสว่างทั่วตัวรถ เพื่อความปลอดภัย ทัศนวิสัยที่ดีในการเดินทาง และการทำงานของโมดูลอิเล็กทรอนิกส์",
        img: "assets/images/lighting_system.jpg",
        parts: [
            "โคมไฟหน้า LED (LED Headlights)",
            "ไฟท้าย / ไฟเบรก (Tail & Brake Lights)",
            "แบตเตอรี่ (Battery)",
            "ไดชาร์จ (Alternator)",
            "กล่องฟิวส์และรีเลย์ (Fuse & Relay Box)",
            "ชุดสายไฟ (Wiring Harness)"
        ],
        keywords: ["ไฟ", "แสงสว่าง", "ไฟหน้า", "ไฟท้าย", "แบตเตอรี่", "ไดชาร์จ", "ฟิวส์", "สายไฟ", "lighting", "battery", "led"]
    },
    {
        id: "lubrication",
        title: "น้ำมันเครื่องและหล่อลื่น",
        titleEn: "Engine Oil & Lubrication",
        tag: "Lubrication",
        desc: "ระบบหล่อลื่นภายในเพื่อลดแรงเสียดทานและการสึกหรอ ป้องกันการเสียดสีกันตรงๆ ของชิ้นส่วนโลหะ และช่วยระบายความร้อนสะสมในห้องเครื่อง",
        img: "assets/images/lubrication_system.jpg",
        parts: [
            "น้ำมันเครื่อง (Engine Oil)",
            "กรองน้ำมันเครื่อง (Oil Filter)",
            "ปั๊มน้ำมันเครื่อง (Oil Pump)",
            "อ่างน้ำมันเครื่อง (Oil Pan)",
            "คูลเลอร์น้ำมันเครื่อง (Oil Cooler)"
        ],
        keywords: ["น้ำมัน", "หล่อลื่น", "น้ำมันเครื่อง", "กรองน้ำมัน", "อ่างน้ำมัน", "lubrication", "oil", "filter"]
    },
    {
        id: "bearings",
        title: "ตลับลูกปืน",
        titleEn: "Bearings",
        tag: "Bearings",
        desc: "ชิ้นส่วนความแม่นยำสูง ออกแบบมาเพื่อรับน้ำหนักและลดแรงเสียดทานของเพลาหมุนต่าง ๆ ช่วยให้ชิ้นส่วนต่าง ๆ หมุนได้อย่างลื่นไหลและเสถียร",
        img: "assets/images/bearings_system.jpg",
        parts: [
            "ลูกปืนล้อ (Wheel Bearing)",
            "ลูกปืนกดคลัตช์ (Clutch Release Bearing)",
            "ลูกปืนเพลากลาง (Center Support Bearing)",
            "ลูกปืนตัวตั้งสายพาน (Tensioner Bearing)"
        ],
        keywords: ["ลูกปืน", "ตลับลูกปืน", "ล้อ", "ตลับ", "bearing", "bearings"]
    },
    {
        id: "drivetrain",
        title: "สายพานและระบบขับเคลื่อน",
        titleEn: "Belts & Drivetrain",
        tag: "Drivetrain",
        desc: "ระบบถ่ายทอดแรงบิดจากเกียร์และเครื่องยนต์ส่งลงสู่ล้อหมุน รวมถึงการทำงานร่วมกันของสายพานขับเพื่อดึงกำลังไปเลี้ยงอุปกรณ์เสริมต่างๆ",
        img: "assets/images/drivetrain_system.jpg",
        parts: [
            "สายพานไทม์มิ่ง (Timing Belt)",
            "สายพานหน้าเครื่อง (Serpentine Belt)",
            "เพลาขับ (Drive Shaft / Axle)",
            "ชุดเฟืองท้าย (Differential)",
            "เพลากลาง (Propeller Shaft)",
            "ข้อต่ออ่อนเพลากลาง (Universal Joints)"
        ],
        keywords: ["สายพาน", "ขับเคลื่อน", "เพลาขับ", "เฟืองท้าย", "เพลากลาง", "ส่งกำลัง", "drivetrain", "belt", "shaft", "differential"]
    }
];

// 2. DOM Elements
const catalogGrid = document.getElementById("catalogGrid");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");
const detailsModal = document.getElementById("detailsModal");
const closeModal = document.getElementById("closeModal");

// Modal specific fields
const modalImg = document.getElementById("modalImg");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPartsList = document.getElementById("modalPartsList");

// 3. Theme Toggle Logic
function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
    }
}

themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("light-theme")) {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
    }
});

// 4. Render Catalog Grid
function renderCatalog(filteredData) {
    catalogGrid.innerHTML = "";

    if (filteredData.length === 0) {
        catalogGrid.innerHTML = `
            <div class="no-results">
                <i class="fa-regular fa-face-frown"></i>
                <h3>ไม่พบข้อมูลชิ้นส่วนที่ค้นหา</h3>
                <p>ลองใช้คำค้นหาอื่นๆ เช่น 'เบรก', 'เพลา', 'น้ำมัน', 'ลูกสูบ'</p>
            </div>
        `;
        return;
    }

    filteredData.forEach(cat => {
        const card = document.createElement("div");
        card.classList.add("category-card");
        card.dataset.id = cat.id;

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${cat.img}" alt="${cat.title}" class="card-img">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <span class="category-tag">${cat.tag}</span>
                    <span class="parts-count">${cat.parts.length} รายการหลัก</span>
                </div>
                <h2 class="card-title">${cat.title}</h2>
                <p class="card-desc">${cat.desc.length > 80 ? cat.desc.substring(0, 80) + '...' : cat.desc}</p>
                <div class="card-footer">
                    <span class="action-link">ดูรายละเอียดเพิ่มเติม <i class="fa-solid fa-arrow-right"></i></span>
                </div>
            </div>
        `;

        // Interactive highlight hover layout tracking
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });

        // Click event to open details Modal
        card.addEventListener("click", () => {
            openCategoryModal(cat);
        });

        catalogGrid.appendChild(card);
    });
}

// 5. Open Modal with Category Details
function openCategoryModal(cat) {
    modalImg.src = cat.img;
    modalImg.alt = cat.title;
    modalTag.textContent = cat.tag;
    modalTitle.innerHTML = `${cat.title} <span style="font-size: 1.1rem; font-weight: 400; color: var(--text-secondary); display:block; margin-top: 0.25rem;">${cat.titleEn}</span>`;
    modalDesc.textContent = cat.desc;

    // Populate Parts List
    modalPartsList.innerHTML = "";
    cat.parts.forEach(part => {
        const li = document.createElement("li");
        li.textContent = part;
        modalPartsList.appendChild(li);
    });

    // Display modal
    detailsModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable background scrolling
}

// 6. Close Modal Logic
function closeCategoryModal() {
    detailsModal.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scrolling
}

closeModal.addEventListener("click", closeCategoryModal);

// Close modal on click outside the card
detailsModal.addEventListener("click", (e) => {
    if (e.target === detailsModal) {
        closeCategoryModal();
    }
});

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detailsModal.classList.contains("active")) {
        closeCategoryModal();
    }
});

// 7. Live Search Filter Logic
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
        renderCatalog(categories);
        return;
    }

    const filtered = categories.filter(cat => {
        // Match in title, description, English title, or keywords
        const matchTitle = cat.title.toLowerCase().includes(query);
        const matchDesc = cat.desc.toLowerCase().includes(query);
        const matchEnTitle = cat.titleEn.toLowerCase().includes(query);
        const matchKeywords = cat.keywords.some(kw => kw.includes(query));
        
        // Match in sub-parts list
        const matchParts = cat.parts.some(part => part.toLowerCase().includes(query));

        return matchTitle || matchDesc || matchEnTitle || matchKeywords || matchParts;
    });

    renderCatalog(filtered);
});

// 8. Initialization
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    renderCatalog(categories);

    // Dynamic mousemove cursor light tracking for service cards
    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    });
});
