(() => {
  const headerHost = document.querySelector("[data-site-header]");
  if (!headerHost) return;

  const { root, currentPage, routes } = window.PanaRoots;

  headerHost.innerHTML = `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header${document.body.dataset.header === "solid" ? " site-header--solid" : ""}" data-header>
      <div class="site-header__inner">
        <a class="brand" href="${root}index.html" aria-label="PanaRoots home">
          <img src="${root}assets/media/logo.png" alt="" width="42" height="42">
          <span>PANAROOTS</span>
        </a>
        <nav class="site-nav" id="site-navigation" aria-label="Primary navigation" data-navigation>
          <ul class="site-nav__list">
            ${routes.map((route) => `
              <li><a href="${root}${route.href}"${route.key === currentPage ? ' aria-current="page"' : ""}>${route.label}</a></li>
            `).join("")}
          </ul>
        </nav>
        <div class="header-actions">
          <a class="button header-cta" href="${root}pages/contact.html?interest=plan">
            Plan your visit <i class="fa-regular fa-arrow-right" aria-hidden="true"></i>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="Open menu" data-menu-toggle>
            <i class="fa-solid fa-bars" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </header>
  `;

  const header = headerHost.querySelector("[data-header]");
  const navigation = headerHost.querySelector("[data-navigation]");
  const menuToggle = headerHost.querySelector("[data-menu-toggle]");
  const menuIcon = menuToggle.querySelector("i");

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuIcon.className = "fa-solid fa-bars";
    document.body.classList.remove("nav-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }

    navigation.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    menuIcon.className = "fa-solid fa-xmark";
    document.body.classList.add("nav-open");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMenu();
  });

  if (document.body.dataset.header !== "solid") {
    const updateHeader = () => header.classList.toggle("is-sticky", window.scrollY > 42);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }
})();
