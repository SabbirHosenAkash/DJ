(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // Hero typewriter: short, outcome-led positioning.
  const phrases = ["intelligent digital experiences", "autonomous AI solutions", "high-performing websites", "discoverable digital brands"];
  const typingTarget = $("#typing-effect");
  if (typingTarget) {
    let phrase = 0, letter = 0, deleting = false;
    const type = () => {
      const current = phrases[phrase];
      letter += deleting ? -1 : 1;
      typingTarget.textContent = current.slice(0, letter);
      let delay = deleting ? 34 : 58;
      if (!deleting && letter === current.length) { deleting = true; delay = 1700; }
      else if (deleting && letter === 0) { deleting = false; phrase = (phrase + 1) % phrases.length; delay = 300; }
      window.setTimeout(type, delay);
    };
    window.setTimeout(type, 700);
  }

  // Mobile navigation.
  const menuButton = $("#menu-btn");
  const nav = $("#nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    $$("#nav-links a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
  }

  // Cinematic service cards — independent of AOS and card transform effects.
  const serviceCards = $$(".service-card");
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  serviceCards.forEach(card => {
    const icon = $(".service-icon-stage i", card);
    const copy = $(".service-copy", card);
    const title = $("h3", copy);
    const description = $("p", copy);
    if (!icon || !copy || !title || !description) return;
    const titleText = title.textContent.trim();
    const descriptionText = description.textContent.trim();
    if (reducedMotion) {
      card.classList.add("logo-docked");
      copy.classList.add("is-visible");
      return;
    }
    let active = false, generation = 0;
    const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));
    const typeText = async (node, value, speed, token) => {
      node.classList.add("typing-cursor");
      for (let index = 0; index < value.length; index++) {
        if (!active || token !== generation) return false;
        node.textContent = value.slice(0, index + 1);
        await wait(speed);
      }
      node.classList.remove("typing-cursor");
      return active && token === generation;
    };
    const run = async () => {
      const token = ++generation;
      while (active && token === generation) {
        card.classList.remove("logo-docked");
        card.classList.add("is-running", "logo-center");
        copy.classList.remove("is-visible");
        title.textContent = "";
        description.textContent = "";
        await wait(1450);
        if (!active || token !== generation) break;

        card.classList.remove("logo-center");
        card.classList.add("logo-docked");
        await wait(1050);
        if (!active || token !== generation) break;

        copy.classList.add("is-visible");
        await wait(280);
        if (!await typeText(title, titleText, 72, token)) break;
        await wait(260);
        if (!await typeText(description, descriptionText, 24, token)) break;
        await wait(2400);
        if (!active || token !== generation) break;

        title.textContent = "";
        description.textContent = "";
        copy.classList.remove("is-visible");
        await wait(700);
      }
    };
    const start = () => { if (active) return; active = true; run(); };
    const stop = () => {
      if (!active) return;
      active = false;
      generation++;
      card.classList.remove("is-running", "logo-center", "logo-docked");
      copy.classList.remove("is-visible");
      title.textContent = titleText;
      description.textContent = descriptionText;
      title.classList.remove("typing-cursor");
      description.classList.remove("typing-cursor");
    };
    // The first visible frame is deliberately triggered only after the card enters view.
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) start();
        else stop();
      }), { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
      observer.observe(card);
    } else {
      start();
    }
  });

  // Scroll reveals are kept off the service cards so they cannot override their animation transforms.
  if (window.AOS) AOS.init({ duration: 750, once: true, offset: 70, easing: "ease-out-cubic" });

  // Selected work slider.
  if (window.Swiper && $(".project-slider")) {
    new Swiper(".project-slider", {
      loop: true, autoplay: { delay: 3200, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      effect: "fade", fadeEffect: { crossFade: true }, speed: 700
    });
  }

  // Contact form: report success only when FormSubmit confirms an OK response.
  const form = $("#contact-form"), status = $("#form-status"), submit = $("#submit-btn"), buttonText = $("#btn-text");
  if (form && status && submit && buttonText) {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      submit.disabled = true;
      buttonText.textContent = "Sending enquiry…";
      status.textContent = "";
      status.className = "";
      try {
        const response = await fetch("https://formsubmit.co/ajax/info.sabbirhosenakash@gmail.com", {
          method: "POST", body: new FormData(form), headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error("Form service returned an error");
        const result = await response.json();
        if (result.success === "false" || result.success === false) throw new Error("Form service rejected the enquiry");
        status.textContent = "Thanks — your enquiry has been submitted.";
        status.className = "success";
        form.reset();
      } catch (error) {
        status.textContent = "The message could not be sent right now. Please email or WhatsApp me directly.";
        status.className = "error";
      } finally {
        submit.disabled = false;
        buttonText.textContent = "Send project enquiry";
      }
    });
  }

  // Install prompt.
  let deferredPrompt;
  const banner = $("#install-banner"), installButton = $("#btn-install"), closeButton = $("#btn-close");
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    if (banner) { window.setTimeout(() => { banner.hidden = false; }, 3500); }
  });
  if (installButton) installButton.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (banner) banner.hidden = true;
  });
  if (closeButton) closeButton.addEventListener("click", () => { if (banner) banner.hidden = true; });

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();