// --- 1. Typing Effect (Hero Section) ---
const textArray = ["Bangladeshi Musician", "Creative Writer", "Web Developer", "SEO Expert"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing-effect");
    if (!typingElement) return;

    const currentText = textArray[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 80 : 150;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // লেখা শেষে ২ সেকেন্ড বিরতি
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// --- 2. AJAX Contact Form (Success Message without Redirect) ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // পেজ রিফ্রেশ হওয়া বন্ধ করবে

        // বাটন লোডিং স্টেট
        submitBtn.disabled = true;
        btnText.textContent = "Sending...";

        const formData = new FormData(this);
        
        // FormSubmit.co এর AJAX এপিআই ব্যবহার করে মেসেজ পাঠানো
        fetch("https://formsubmit.co/ajax/info.sabbirhosenakash@gmail.com", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // সফলভাবে মেসেজ গেলে যা হবে
            formStatus.style.display = "block";
            formStatus.className = "success";
            formStatus.textContent = "✔ Message Sent Successfully!";
            contactForm.reset(); // ফর্ম খালি করে দিবে
            btnText.textContent = "Send Message";
            submitBtn.disabled = false;
            
            // ৫ সেকেন্ড পর মেসেজটি চলে যাবে
            setTimeout(() => { formStatus.style.display = "none"; }, 5000);
        })
        .catch(error => {
            // এরর হলে যা হবে
            formStatus.style.display = "block";
            formStatus.className = "error";
            formStatus.textContent = "❌ Oops! Something went wrong.";
            btnText.textContent = "Try Again";
            submitBtn.disabled = false;
        });
    });
}

// --- 3. Initialize AOS (Scroll Animation) ---
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// --- 4. Swiper JS (Project Slider) ---
const swiper = new Swiper('.project-slider', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
});

// --- 5. 3D Skill Bar Animation on Scroll ---
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.fill-3d');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.style.getPropertyValue('--width');
        progressBar.style.width = value;
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showProgress();
        }
    });
}, { threshold: 0.5 });

if (skillSection) {
    observer.observe(skillSection);
}

// --- 6. Mobile Menu Logic ---
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// মেনু লিঙ্কে ক্লিক করলে মেনু ক্লোজ হওয়া
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('active');
    });
});

// --- 7. Particles JS Config ---
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00ff88" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00ff88", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 3, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { 
                "onhover": { "enable": true, "mode": "grab" }, 
                "onclick": { "enable": true, "mode": "push" } 
            }
        },
        "retina_detect": true
    });
}

// --- 8. Page Initializer ---
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});


let deferredPrompt;
const installBanner = document.getElementById('install-banner');
const btnInstall = document.getElementById('btn-install');
const btnClose = document.getElementById('btn-close');

window.addEventListener('beforeinstallprompt', (e) => {
    // ডিফল্ট ব্রাউজার প্রম্পট আটকানো
    e.preventDefault();
    deferredPrompt = e;

    // ৫ সেকেন্ড পর আপনার কাস্টম নোটিফিকেশন বারটি দেখাবে
    setTimeout(() => {
        installBanner.style.display = 'flex';
    }, 5000);
});

// ইনস্টল বাটনে ক্লিক করলে যা হবে
btnInstall.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // আসল ইনস্টল পপ-আপ দেখাবে
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User installed the app');
            }
            installBanner.style.display = 'none';
            deferredPrompt = null;
        });
    }
});

// ক্লোজ বাটনে ক্লিক করলে বারটি চলে যাবে
btnClose.addEventListener('click', () => {
    installBanner.style.display = 'none';
});

window.addEventListener('online', () => alert('আপনি এখন অনলাইনে আছেন!'));
window.addEventListener('offline', () => alert('আপনার ইন্টারনেট সংযোগ বিচ্ছিন্ন হয়েছে।'));


// --- 9. Service cards: centre-pop logo, smooth docking, typewriter and repeat loop ---
(function initCinematicServiceCards() {
    function initialise() {
        const cards = document.querySelectorAll("#services .interactive-box");
        if (!cards.length) return;

        const reducedMotion = window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        cards.forEach((card) => {
            if (card.dataset.cinematicReady === "true") return;

            const icon = card.querySelector(":scope > i");
            const heading = card.querySelector(":scope > h3");
            const paragraph = card.querySelector(":scope > p");
            if (!icon || !heading || !paragraph) return;

            card.dataset.cinematicReady = "true";
            const titleText = heading.textContent.trim();
            const descriptionText = paragraph.textContent.trim();

            const stage = document.createElement("div");
            stage.className = "service-icon-stage";
            stage.setAttribute("aria-hidden", "true");
            stage.appendChild(icon);

            const copy = document.createElement("div");
            copy.className = "service-copy";
            heading.textContent = "";
            paragraph.textContent = "";
            copy.append(heading, paragraph);

            card.insertBefore(stage, card.firstChild);
            card.appendChild(copy);
            card.setAttribute("aria-label", titleText + ". " + descriptionText);

            if (reducedMotion) {
                heading.textContent = titleText;
                paragraph.textContent = descriptionText;
                copy.classList.add("copy-ready");
                icon.classList.add("logo-docking");
                return;
            }

            let active = false;
            let cycle = 0;
            const wait = (ms) => new Promise(resolve => window.setTimeout(resolve, ms));

            async function typeText(element, value, speed, token) {
                element.classList.add("typing-cursor");
                for (let i = 0; i < value.length; i++) {
                    if (!active || token !== cycle) return false;
                    element.textContent = value.slice(0, i + 1);
                    await wait(speed);
                }
                element.classList.remove("typing-cursor");
                return active && token === cycle;
            }

            async function playLoop() {
                const token = ++cycle;
                while (active && token === cycle) {
                    copy.classList.remove("copy-ready");
                    heading.textContent = "";
                    paragraph.textContent = "";
                    heading.classList.remove("typing-cursor");
                    paragraph.classList.remove("typing-cursor");
                    icon.classList.remove("logo-docking");
                    card.classList.add("is-cinematic");

                    // First: the round logo grows dramatically in the centre.
                    icon.classList.add("logo-at-center");
                    await wait(1250);
                    if (!active || token !== cycle) break;

                    // Second: it glides up and settles into its own position.
                    icon.classList.remove("logo-at-center");
                    icon.classList.add("logo-docking");
                    await wait(1000);
                    if (!active || token !== cycle) break;

                    // Third: reveal and type the title, then the description.
                    copy.classList.add("copy-ready");
                    await wait(250);
                    if (!await typeText(heading, titleText, 82, token)) break;
                    await wait(280);
                    if (!await typeText(paragraph, descriptionText, 29, token)) break;

                    await wait(2200);
                    if (!active || token !== cycle) break;

                    // Clear the copy, pause, then repeat from the centre-logo reveal.
                    heading.textContent = "";
                    paragraph.textContent = "";
                    copy.classList.remove("copy-ready");
                    await wait(700);
                }
            }

            const start = () => {
                if (active) return;
                active = true;
                playLoop();
            };
            const stop = () => {
                if (!active) return;
                active = false;
                cycle++;
                heading.textContent = "";
                paragraph.textContent = "";
                heading.classList.remove("typing-cursor");
                paragraph.classList.remove("typing-cursor");
                copy.classList.remove("copy-ready");
                icon.classList.remove("logo-at-center", "logo-docking");
                card.classList.remove("is-cinematic");
            };

            if ("IntersectionObserver" in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) start();
                        else stop();
                    });
                }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
                observer.observe(card);
            } else {
                start();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialise, { once: true });
    } else {
        initialise();
    }
})();
