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


// --- 9. Cinematic service cards: centre logo, dock, colourful type/delete loop ---
document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelectorAll("#services .interactive-box");
    const prefersReducedMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    serviceCards.forEach((card) => {
        const icon = card.querySelector(":scope > i");
        const heading = card.querySelector(":scope > h3");
        const paragraph = card.querySelector(":scope > p");
        if (!icon || !heading || !paragraph) return;

        const titleText = heading.textContent.trim();
        const descriptionText = paragraph.textContent.trim();

        const stage = document.createElement("div");
        stage.className = "service-icon-stage";
        stage.appendChild(icon);

        const copy = document.createElement("div");
        copy.className = "service-copy";
        heading.classList.add("typing-cursor");
        paragraph.classList.add("typing-cursor");
        heading.textContent = "";
        paragraph.textContent = "";
        copy.append(heading, paragraph);

        card.insertBefore(stage, card.firstChild);
        card.appendChild(copy);
        card.setAttribute("aria-label", titleText + ". " + descriptionText);

        if (prefersReducedMotion) {
            heading.textContent = titleText;
            paragraph.textContent = descriptionText;
            icon.style.opacity = "1";
            icon.style.transform = "none";
            copy.classList.add("copy-ready");
            return;
        }

        let active = false;
        let cycle = 0;

        const wait = (ms) => new Promise(resolve => window.setTimeout(resolve, ms));

        async function typeText(element, text, speed, token) {
            element.classList.add("typing-cursor");
            for (let i = 1; i <= text.length; i++) {
                if (!active || token !== cycle) return false;
                element.textContent = text.slice(0, i);
                await wait(speed);
            }
            element.classList.remove("typing-cursor");
            return active && token === cycle;
        }

        async function animateLoop() {
            const token = ++cycle;
            while (active && token === cycle) {
                // The logo first appears in the exact visual centre of the card.
                copy.classList.remove("copy-ready");
                heading.textContent = "";
                paragraph.textContent = "";
                icon.classList.remove("logo-docking");
                icon.classList.add("logo-at-center");
                card.classList.add("is-cinematic");
                await wait(1050);
                if (!active || token !== cycle) break;

                // It then glides into its normal icon position above the copy.
                icon.classList.remove("logo-at-center");
                icon.classList.add("logo-docking");
                await wait(900);
                if (!active || token !== cycle) break;

                copy.classList.add("copy-ready");
                await wait(260);
                if (!await typeText(heading, titleText, 78, token)) break;
                await wait(320);
                if (!await typeText(paragraph, descriptionText, 27, token)) break;
                await wait(1900);

                // Text clears completely before the next cinematic logo entrance.
                heading.textContent = "";
                paragraph.textContent = "";
                copy.classList.remove("copy-ready");
                await wait(650);
            }
        }

        const cardObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !active) {
                    active = true;
                    animateLoop();
                } else if (!entry.isIntersecting && active) {
                    active = false;
                    cycle++;
                    heading.textContent = "";
                    paragraph.textContent = "";
                    copy.classList.remove("copy-ready");
                    icon.classList.remove("logo-at-center", "logo-docking");
                    card.classList.remove("is-cinematic");
                }
            });
        }, { threshold: 0.35 });

        cardObserver.observe(card);
    });
});
