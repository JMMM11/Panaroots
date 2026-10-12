const hero = document.querySelector("[data-parallax-hero]");
if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;

  const updateParallax = () => {
    const bounds = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(bounds.height, 1)));
    hero.style.setProperty("--background-shift", `${progress * -16}px`);
    hero.style.setProperty("--title-shift", `${progress * -46}px`);
    hero.style.setProperty("--island-shift", `${progress * -24}px`);
    hero.style.setProperty("--water-shift", `${progress * 12}px`);
    ticking = false;
  };

  const requestParallax = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
}

const tourFilters = document.querySelector("[data-tour-filters]");
if (tourFilters) {
  const cards = [...document.querySelectorAll("[data-tour-card]")];
  const category = tourFilters.querySelector("[name='category']");
  const destination = tourFilters.querySelector("[name='destination']");
  const count = document.querySelector("[data-tour-count]");
  const empty = document.querySelector("[data-tour-empty]");
  const params = new URLSearchParams(window.location.search);

  const setIfValid = (select, value) => {
    if (value && [...select.options].some((option) => option.value === value)) select.value = value;
  };

  setIfValid(category, params.get("experience") || params.get("category"));
  setIfValid(destination, params.get("destination"));

  const filterTours = () => {
    let visible = 0;
    cards.forEach((card) => {
      const categoryMatches = !category.value || card.dataset.category === category.value;
      const destinations = (card.dataset.destinations || "").split(" ");
      const destinationMatches = !destination.value || destinations.includes(destination.value);
      const show = categoryMatches && destinationMatches;
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = `${visible} experience ${visible === 1 ? "concept" : "concepts"}`;
    empty.hidden = visible !== 0;
  };

  tourFilters.addEventListener("change", filterTours);
  filterTours();
}

const calendarFilters = document.querySelector("[data-calendar-filters]");
if (calendarFilters) {
  const eventCards = [...document.querySelectorAll("[data-event-card]")];
  const month = calendarFilters.querySelector("[name='month']");
  const category = calendarFilters.querySelector("[name='category']");
  const count = document.querySelector("[data-event-count]");
  const empty = document.querySelector("[data-event-empty]");

  const filterEvents = () => {
    let visible = 0;
    eventCards.forEach((card) => {
      const monthMatches = !month.value || card.dataset.month === month.value;
      const categoryMatches = !category.value || card.dataset.category === category.value;
      const show = monthMatches && categoryMatches;
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = `${visible} cultural ${visible === 1 ? "highlight" : "highlights"}`;
    empty.hidden = visible !== 0;
  };

  calendarFilters.addEventListener("change", filterEvents);
  filterEvents();
}

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  const interest = contactForm.querySelector("[name='interest']");
  const status = contactForm.querySelector("[data-form-status]");
  const requestedInterest = new URLSearchParams(window.location.search).get("interest");
  if (requestedInterest && [...interest.options].some((option) => option.value === requestedInterest)) {
    interest.value = requestedInterest;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const draft = Object.fromEntries(new FormData(contactForm));
    draft.savedAt = new Date().toISOString();
    try {
      localStorage.setItem("panaroots-enquiry", JSON.stringify(draft));
      status.classList.remove("is-error");
      status.textContent = "Your enquiry has been saved on this device. Connect the form to the official PanaRoots inbox before launch.";
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = "This browser could not save the enquiry. Please try again in a standard browser window.";
    }
  });
}
