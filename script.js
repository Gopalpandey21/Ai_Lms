const navLinks = document.querySelectorAll(".nav-link");
const welcomeBox = document.querySelector(".welcome-box");
const underline = document.querySelector(".underline");

// Load page content
function loadPage(page) {
    if (page === "teacher") {
        window.location.href = "login.html";
        return;
    }

    const pageMap = {
        home: "pages/home.html",
        ebook: "pages/E-book.html",
        qa: "pages/Q&A.html",
        quicktest: "pages/Quick-Test.html",
        study: "pages/Study-Material.html",
        teacher: "teacher.html"
    };

    const url = pageMap[page];
    if (!url) return;

    fetch(url)
        .then(res => res.text())
        .then(html => {
            welcomeBox.innerHTML = html;
            
            // Re-initialize specific scripts based on which page loaded
            if (page === "home") {
                initChapterValidation();
            } else if (page === "ebook") {
                initSidebarToggle(); // Initialize sidebar logic for E-book
            }
        })
        .catch(err => {
            welcomeBox.innerHTML = `<h2>Error loading page</h2><p>${err.message}</p>`;
        });
}

// Set active link
function setActiveLink(el) {
    navLinks.forEach(l => l.classList.remove("active"));
    el.classList.add("active");
}

// Click event for nav links
navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        setActiveLink(this);
        loadPage(page);
    });
});

// Load default page (home) on window load
window.addEventListener("load", () => {
    const active = document.querySelector(".nav-link.active");
    if (active) {
        setActiveLink(active);
        loadPage(active.dataset.page);
    }
});


// --- FEATURE SPECIFIC FUNCTIONS ---

// 1. Home Page: Chapter Dropdown Validation
function initChapterValidation() {
    const promptInput = welcomeBox.querySelector(".prompt-input");
    const chapterSelect = welcomeBox.querySelector(".chapter-select");
    const sendButton = welcomeBox.querySelector(".send-button");

    if (!promptInput || !chapterSelect) return;

    // Make textarea readonly until chapter selected
    promptInput.readOnly = true;

    // Enable typing when chapter selected
    chapterSelect.addEventListener("change", () => {
        if (chapterSelect.value) {
            promptInput.readOnly = false;
            promptInput.focus();
        }
    });

    // Send button click without chapter
    if (sendButton) {
        sendButton.addEventListener("click", () => {
            if (!chapterSelect.value) {
                blinkChapterDropdown(chapterSelect);
                promptInput.readOnly = true;
            }
        });
    }

    // Typing attempt without chapter
    promptInput.addEventListener("focus", () => {
        if (!chapterSelect.value) {
            promptInput.blur();
            blinkChapterDropdown(chapterSelect);
        }
    });
}

function blinkChapterDropdown(el) {
    el.classList.add("blink");
    setTimeout(() => {
        el.classList.remove("blink");
    }, 1200);
}


// 2. Study Material Page: Switch to Reader View
function showReader() {
    const chapterList = document.getElementById('chapter-list-screen');
    const readerScreen = document.getElementById('reader-screen');
    
    if (chapterList) chapterList.classList.remove('active');
    if (readerScreen) readerScreen.classList.add('active');
}


// 3. E-book Page: Sidebar Toggle Logic
function initSidebarToggle() {
    const toggleBtn = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("chapterSidebar");
    const layout = document.querySelector(".ebook-layout");
    
    if (toggleBtn && sidebar && layout) {
        const icon = toggleBtn.querySelector("i");
        
        toggleBtn.addEventListener("click", () => {
            // 1. Toggle Sidebar Visibility
            sidebar.classList.toggle("collapsed");
            
            // 2. Toggle Layout State (moves the button)
            layout.classList.toggle("sidebar-closed");

            // 3. Rotate Icon
            if (sidebar.classList.contains("collapsed")) {
                icon.classList.remove("fa-chevron-left");
                icon.classList.add("fa-chevron-right");
            } else {
                icon.classList.remove("fa-chevron-right");
                icon.classList.add("fa-chevron-left");
            }
        });
    }
}