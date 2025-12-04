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
        study: "pages/Study-Material.html"
    };

    const url = pageMap[page];
    if (!url) return;

    fetch(url)
        .then(res => res.text())
        .then(html => {
            welcomeBox.innerHTML = html;

            // Initialize input & chapter select after content is loaded
            initChapterValidation();
        })
        .catch(err => {
            welcomeBox.innerHTML = `<h2>Error loading page</h2><p>${err.message}</p>`;
        });
}

// Set active link and move underline
function setActiveLink(el) {
    navLinks.forEach(l => l.classList.remove("active"));
    el.classList.add("active");
    moveUnderline(el);
}

// Move underline below active link
function moveUnderline(el) {
    const rect = el.getBoundingClientRect();
    const navRect = document.querySelector(".nav-links").getBoundingClientRect();
    underline.style.width = rect.width + "px";
    underline.style.left = (rect.left - navRect.left) + "px";
    const bottomPos = rect.bottom - navRect.top; 
    underline.style.top = bottomPos + "px";
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

// --- Function: Validate chapter selection ---
// function initChapterValidation() {
//     const promptInput = welcomeBox.querySelector(".prompt-input");
//     const chapterSelect = welcomeBox.querySelector(".chapter-select");
//     const sendButton = welcomeBox.querySelector(".send-button");

//     if (!promptInput || !chapterSelect) return;

//     // Disable input initially
//     promptInput.disabled = true;

//     // Enable typing when chapter selected
//     chapterSelect.addEventListener("change", () => {
//         if (chapterSelect.value) {
//             promptInput.disabled = false;
//             promptInput.focus(); // optional: auto-focus
//         }
//     });

//     // If user clicks send without selecting chapter
//     if (sendButton) {
//         sendButton.addEventListener("click", () => {
//             if (!chapterSelect.value) {
//                 blinkChapterDropdown(chapterSelect);
//                 promptInput.disabled = true;
//             }
//         });
//     }

//     // If user tries to type without selecting chapter
//     promptInput.addEventListener("mousedown", (e) => {
//         if (!chapterSelect.value) {
//             e.preventDefault(); // prevent typing
//             blinkChapterDropdown(chapterSelect);
//         }
//     });

//     promptInput.addEventListener("focus", () => {
//         if (!chapterSelect.value) {
//             promptInput.blur(); // remove focus
//             blinkChapterDropdown(chapterSelect);
//         }
//     });
// }

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

// Blink function
function blinkChapterDropdown(el) {
    el.classList.add("blink");
    setTimeout(() => {
        el.classList.remove("blink");
    }, 1200);
}


// Blink helper function
function blinkChapterDropdown(el) {
    el.classList.add("blink");
    setTimeout(() => {
        el.classList.remove("blink");
    }, 1200);
}
