(() => {
  const footerHost = document.querySelector("[data-site-footer]");
  if (!footerHost) return;

  const { root, routes } = window.PanaRoots;
  const link = (route) => `<li><a href="${root}${route.href}">${route.label}</a></li>`;

  footerHost.innerHTML = `
    <footer class="site-footer">
      <div class="container site-footer__main">
        <div class="site-footer__about">
          <a class="brand" href="${root}index.html" aria-label="PanaRoots home">
            <img src="${root}assets/media/logo.png" alt="" width="42" height="42">
            <span>PANAROOTS</span>
          </a>
          <p>PanaRoots connects international visitors with Panama's culture, traditions, gastronomy, crafts and local communities.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul class="footer-links">
            ${routes.slice(1, 5).map(link).join("")}
          </ul>
        </div>
        <div>
          <h2>PanaRoots</h2>
          <ul class="footer-links">
            ${routes.slice(5).map(link).join("")}
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>&copy; ${new Date().getFullYear()} PanaRoots. Feel the essence of Panama.</span>
        <span>Event dates and availability should be confirmed before travel.</span>
      </div>
    </footer>
  `;
})();
