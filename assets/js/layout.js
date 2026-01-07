const LINKS = {
  home: { href: 'index.html', label: 'Home', nav: 'home' },
  about: { href: 'about.html', label: 'About', nav: 'about' },
  services: { href: 'services.html', label: 'Services', nav: 'services' },
  portfolio: { href: 'portfolio.html', label: 'Project', nav: 'portfolio' },
  blog: { href: 'blog.html', label: 'Blog', nav: 'blog' },
  contact: { href: 'contact.html', label: 'Contact', nav: 'contact' }
};

const FOOTER_LINKS = {
  about: { href: 'about.html', label: 'About' },
  services: { href: 'services.html', label: 'Services' },
  portfolio: { href: 'portfolio.html', label: 'Portfolio' },
  project: { href: 'portfolio.html', label: 'Project' },
  blog: { href: 'blog.html', label: 'Blog' },
  contact: { href: 'contact.html', label: 'Contact' }
};

const PAGE_CONFIG = {
  home: {
    nav: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog],
    mobile: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog, LINKS.contact],
    headerCtaHref: 'contact.html#book',
    headerLogoAlt: 'RZ MEGA RESOURCES',
    hideBrandText: true,
    footerLogoAlt: 'RZ Mega Resources',
    footerPages: [
      FOOTER_LINKS.about,
      FOOTER_LINKS.services,
      FOOTER_LINKS.project,
      FOOTER_LINKS.blog,
      FOOTER_LINKS.contact
    ],
    footerContactBreak: '<br/><br/>',
    footerBlurbHtml:
      'Parent group for WSS Creative Studio, RZ Kitchen, Masterpips Academy, MRX Consulting.',
    footerYearStyle: ''
  },
  about: {
    nav: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog],
    mobile: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog, LINKS.contact],
    headerCtaHref: 'contact.html#book',
    headerLogoAlt: 'RZ Mega Resources',
    hideBrandText: true,
    footerLogoAlt: '',
    footerPages: [
      FOOTER_LINKS.services,
      FOOTER_LINKS.portfolio,
      FOOTER_LINKS.blog,
      FOOTER_LINKS.contact
    ],
    footerYearStyle: 'margin-top:10px;'
  },
  services: {
    nav: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog],
    mobile: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog, LINKS.contact],
    headerCtaHref: 'contact.html#book',
    headerLogoAlt: 'RZ Mega Resources',
    hideBrandText: true,
    footerLogoAlt: 'RZ Mega Resources',
    footerPages: [
      FOOTER_LINKS.about,
      FOOTER_LINKS.portfolio,
      FOOTER_LINKS.blog,
      FOOTER_LINKS.contact
    ],
    footerYearStyle: 'margin-top:10px;'
  },
  blog: {
    nav: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog],
    mobile: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog, LINKS.contact],
    headerCtaHref: 'contact.html#book',
    headerLogoAlt: 'RZ Mega Resources',
    hideBrandText: true,
    footerLogoAlt: 'RZ Mega Resources',
    footerPages: [
      FOOTER_LINKS.about,
      FOOTER_LINKS.services,
      FOOTER_LINKS.portfolio,
      FOOTER_LINKS.contact
    ],
    footerYearStyle: 'margin-top:10px;'
  },
  portfolio: {
    nav: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog],
    mobile: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog, LINKS.contact],
    headerCtaHref: 'contact.html#book',
    headerLogoAlt: 'RZ Mega Resources',
    hideBrandText: true,
    footerLogoAlt: 'RZ Mega Resources',
    footerPages: [
      FOOTER_LINKS.about,
      FOOTER_LINKS.services,
      FOOTER_LINKS.blog,
      FOOTER_LINKS.contact
    ],
    footerYearStyle: 'margin-top:10px;'
  },
  contact: {
    nav: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog, LINKS.contact],
    mobile: [LINKS.about, LINKS.services, LINKS.portfolio, LINKS.blog, LINKS.contact],
    headerCtaHref: '',
    headerLogoAlt: 'RZ Mega Resources',
    hideBrandText: true,
    footerLogoAlt: 'RZ Mega Resources',
    footerPages: [
      FOOTER_LINKS.about,
      FOOTER_LINKS.services,
      FOOTER_LINKS.portfolio,
      FOOTER_LINKS.blog
    ],
    footerYearStyle: 'margin-top:10px;'
  }
};

function renderNavLinks(links) {
  return links
    .map(link => `<a href="${link.href}" data-nav="${link.nav}">${link.label}</a>`)
    .join('');
}

function renderMobileLinks(links) {
  return links.map(link => `<a href="${link.href}">${link.label}</a>`).join('');
}

function renderFooterPages(links) {
  return links
    .map(link => `<a class="small" href="${link.href}">${link.label}</a>`)
    .join('<br/>');
}

function injectSharedLayout() {
  const page = document.body ? document.body.getAttribute('data-page') : 'home';
  const config = PAGE_CONFIG[page] || PAGE_CONFIG.home;
  const header = document.querySelector('[data-shared="header"]');
  const footer = document.querySelector('[data-shared="footer"]');

  if (header) {
    const headerCta = config.headerCtaHref
      ? `<a class="btn primary" href="${config.headerCtaHref}">Contact us</a>`
      : '';
    header.innerHTML = `
  <div class="container">
    <div class="nav">
      <a class="brand" href="index.html">
        <img src="assets/img/logo.png" alt="${config.headerLogoAlt}"/>
        <div class="${config.hideBrandText ? 'brandText is-hidden' : 'brandText'}">
          <div class="name">RZ MEGA RESOURCES</div>
          <div class="tag">Multi-brand business group</div>
        </div>
      </a>

      <nav class="menu">
        ${renderNavLinks(config.nav)}
      </nav>

      <div class="actions">
        ${headerCta}
        <button class="btn burger" data-burger aria-label="Menu">ƒ~ø</button>
      </div>
    </div>

    <div class="mobileMenu" data-mobile-menu>
      ${renderMobileLinks(config.mobile)}
    </div>
  </div>
`;
  }

  if (footer) {
    const footerBlurb = config.footerBlurbHtml
      ? `<p class="small" style="margin-top:10px; max-width: 55ch;">
        ${config.footerBlurbHtml}
      </p>`
      : '';
    const yearStyle = config.footerYearStyle ? ` style="${config.footerYearStyle}"` : '';
    const contactBreak = config.footerContactBreak || '';
    footer.innerHTML = `
  <div class="container footerGrid">
    <div>
      <div class="brand" style="padding:0;">
        <img src="assets/img/logo.png" alt="${config.footerLogoAlt}"/>
        <div>
          <div class="name">RZ Mega Resources</div>
          <div class="tag">Credibility ƒ?½ Leads ƒ?½ Booking</div>
        </div>
      </div>
      ${footerBlurb}
      <p class="small"${yearStyle}>¶¸ <span data-year></span> RZ Mega Resources</p>
    </div>

    <div>
      <b>Pages</b><br/>
      ${renderFooterPages(config.footerPages)}
    </div>

    <div>
      <b>Contact</b><br/>
      <a class="small" href="mailto:hello@rzmegaresources.com">hello@rzmegaresources.com</a><br/>
      <span class="small">WhatsApp: +60 XX-XXXX XXXX</span>${contactBreak}
    </div>
  </div>
`;
  }
}

window.injectSharedLayout = injectSharedLayout;
