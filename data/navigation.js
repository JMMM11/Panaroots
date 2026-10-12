// Static site data shared by the header and footer. Paths are relative to the project root.
window.PanaRoots = {
  root: document.body.dataset.root || "",
  currentPage: document.body.dataset.page || "home",
  routes: [
    { key: "home", label: "Home", href: "index.html" },
    { key: "destinations", label: "Destinations", href: "pages/destinations.html" },
    { key: "tours", label: "Tours", href: "pages/tours.html" },
    { key: "experiences", label: "Experiences", href: "pages/experiences.html" },
    { key: "calendar", label: "Cultural Calendar", href: "pages/calendar.html" },
    { key: "about", label: "About", href: "pages/about.html" },
    { key: "contact", label: "Contact", href: "pages/contact.html" },
  ],
};
