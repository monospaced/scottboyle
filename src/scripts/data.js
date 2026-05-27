const url = "https://scottboyle.uk";

module.exports = {
  url,
  title: "Scott Boyle",
  subtitle: "Portfolio",
  description:
    "Web professional specialising in design engineering and modern front-end development.",
  about: `
<a class="fn uid url" href="${url}" translate="no">Scott Boyle</a> (<span class="nickname" translate="no">monospaced</span>) is a <span class="category">web professional</span> <span class="note">specialising in modern front-end development</span>.

<span translate="no">Scott</span> lives in <span class="adr"><span class="locality">London</span>, <span class="country-name">UK</span></span>, and is the Principal Design Engineer at <a class="org" href="https://measured.co" translate="no">Measured</a>, a web UI consultancy working with clients across the UK and around the world.

### Contact

* <a href="mailto:scott@monospaced.com" class="email">scott@monospaced.com</a>

### Elsewhere

* <a href="https://www.are.na/mono-spaced" rel="me">Are.na</a>
* <a href="https://github.com/monospaced" rel="me" translate="no">GitHub</a>
* <a href="https://www.linkedin.com/in/scottboyle/" rel="me" translate="no">LinkedIn</a>
  `,
  linklogErrorMessage: "Unable to load linklog.",
  projects: {
    dunnhumby: {
      title: "dunnhumby",
      date: "2024–2026",
      client: {
        title: "Measured",
        link: "https://measured.co",
      },
      image: {
        width: 398,
        height: 216,
      },
      content: `
Advised on a new design system, then led its integration into a legacy application stack.
      `,
    },
    hilton: {
      title: "Hilton",
      date: "2022–2025",
      link: "https://www.hilton.com",
      client: {
        title: "Measured",
        link: "https://measured.co",
      },
      image: {
        width: 398,
        height: 209,
      },
      content: `
Consulted on the development of a multi-brand design system.
      `,
    },
    hubble: {
      title: "Hubble",
      date: "2019–2023",
      link: "https://www.hubblehq.com",
      client: {
        title: "Measured",
        link: "https://measured.co",
      },
      image: {
        width: 398,
        height: 216,
      },
      content: `
Migrated Hubble’s site from AngularJS to React and architected a UI system to support their new brand.

Also led a project to expand and refine their On-Demand product.
      `,
    },
    bt: {
      title: "BT",
      date: "2020–2022",
      link: "https://business.bt.com",
      client: {
        title: "Measured",
        link: "https://measured.co",
      },
      image: {
        width: 398,
        height: 175,
      },
      content: `
Developed and launched the Arc design system for BT Buisness.
      `,
    },
    refinitiv: {
      title: "Refinitiv",
      date: "2018–2019",
      link: "https://www.lseg.com",
      image: {
        width: 398,
        height: 269,
      },
      content: `
Rebranded WEL (the Thomson Reuters design system) for Refinitiv, producing significant cost savings for both businesses.

WEL lives on at LSEG, which acquired Refinitiv in 2021.
      `,
    },
    "thomson-reuters": {
      title: "Thomson Reuters",
      date: "2017–2019",
      image: {
        width: 398,
        height: 312,
      },
      content: `
Worked as part of a team building WEL, a design system and React component library that integrated with AEM to power thomsonreuters.com.
      `,
    },
    "social-360": {
      title: "Social 360",
      date: "2014–2018",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 398,
        height: 310,
      },
      content: `
Led the build and delivery of a complex single-page web application, including Highcharts data visualisation, Redux state management, and Jest unit testing.

Also delivered a full marketing website, including front end and CMS (Perch).
      `,
    },
    omron: {
      title: "Omron",
      date: "2017",
      link: "",
      client: {
        title: "Hanno",
        link: "https://hanno.co/work/omron/",
      },
      image: {
        width: 398,
        height: 209,
      },
      content: `
Assisted Hanno with front-end development of the Evolv microsite.
      `,
    },
    "compass-group": {
      title: "Compass Group",
      date: "2017",
      link: "",
      image: {
        width: 398,
        height: 244,
      },
      content: `
### Retail Pricing Portal

Designed the UI and delivered the complete front-end build for an Angular NgRx web app.
      `,
    },
    passionflix: {
      title: "Passionflix",
      date: "2017",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 398,
        height: 246,
      },
      content: `
Delivered the complete front-end build for a React/webpack static site generator.
      `,
    },
    traq: {
      title: "Traq",
      date: "2015–2017",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 398,
        height: 308,
      },
      content: `
Produced technical specifications and led the AngularJS front-end build. Integrated Stripe payments, managed CI and AWS infrastructure, and ensured PCI compliance in close collaboration with the product team and .NET API developers.
      `,
    },
    freeform: {
      title: "Freeform",
      date: "2015–2016",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 398,
        height: 241,
      },
      content: `
Built full-stack prototypes and technical experiments using a range of technologies, including Node.js, React, AngularJS, Angular, Ionic, OpenCV, Leap Motion, Alexa Skills, and the Facebook Messenger Platform.
      `,
    },
    "just-eat": {
      title: "Just Eat",
      date: "2011–2016",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 398,
        height: 311,
      },
      content: `
Built front-end templates for a responsive homepage, mobile app prototypes, and a website refresh.
      `,
    },
    nhs: {
      title: "NHS",
      date: "2015",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 398,
        height: 351,
      },
      content: `
### Islington GP Hubs

Managed the delivery of this content website.
      `,
    },
    "find-my-past": {
      title: "Find My Past",
      date: "2013–2014",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 398,
        height: 321,
      },
      content: `
Designed and built the front end for a family tree web app in AngularJS, with its complex diagram views constructed entirely in CSS.
      `,
    },
    "dow-jones": {
      title: "Dow Jones",
      date: "2008–2013",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 352,
      },
      content: `
### Financial News

Delivered complete front-end templates for the redesign of efinancialnews.com. Semantic HTML and object-oriented CSS produced a lightweight, accessible, and SEO-friendly site.
      `,
    },
    bilbary: {
      title: "Bilbary",
      date: "2012",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 190,
      },
      content: `
Built a prototype web e-book reader for a digital library startup. It lives on as [Paperback](https://monospaced.github.io/paperback/), an open-source project.
      `,
    },
    "genes-reunited": {
      title: "Genes Reunited",
      date: "2012",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 143,
      },
      content: `
Consulted on a site-wide design refresh, created indicative templates, and assisted with integration.
      `,
    },
    "bladud-flies": {
      title: "Bladud Flies!",
      date: "2011",
      link: "",
      client: null,
      image: {
        width: 199,
        height: 252,
      },
      content: `
Delivered the full website build, including front end and CMS (WordPress).
      `,
    },
    silu: {
      title: "Silu",
      date: "2011",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 369,
      },
      content: `
Led front-end development for a portal website aimed at the global Chinese professional community, working closely with Ruby on Rails developers and the product team.
      `,
    },
    stordis: {
      title: "Stordis",
      date: "2011",
      link: "",
      image: {
        width: 199,
        height: 231,
      },
      content: `
Designed and built the full site end-to-end, including a bespoke CMS and search integration in PHP/MySQL. Also handled requirements gathering, deployment, and SEO and performance optimisation.
      `,
    },
    amberlight: {
      title: "Amberlight",
      date: "2010",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 185,
      },
      content: `
Led all aspects of site development, from static templates to form functionality, CMS integration, and site deployment.
      `,
    },
    cadbury: {
      title: "Cadbury",
      date: "2010",
      link: "",
      client: {
        title: "Pirata",
        link: "",
      },
      image: {
        width: 199,
        height: 252,
      },
      content: `
### Spots v Stripes

Delivered JavaScript animations and data integration, including counters, odometers, tickers, and sound fx.
      `,
    },
    lloyds: {
      title: "Lloyds",
      date: "2010",
      link: "",
      client: {
        title: "Suburb",
        link: "",
      },
      image: {
        width: 199,
        height: 232,
      },
      content: `
### British Weather Photographer of the Year

Built front-end templates for this competition microsite.
      `,
    },
    ogilvy: {
      title: "Ogilvy",
      date: "2010",
      link: "",
      client: {
        title: "OgilvyOne",
        link: "https://ogilvy.com/uk/",
      },
      image: {
        width: 199,
        height: 153,
      },
      content: `
### Tools Not Rules Wiki

Skinned and configured MediaWiki.
      `,
    },
    sharp: {
      title: "Sharp",
      date: "2010",
      link: "",
      client: {
        title: "Pirata",
        link: "",
      },
      image: {
        width: 199,
        height: 128,
      },
      content: `
### Sharp Quattron

Delivered Google Maps API search and display functionality.
      `,
    },
    travelmatch: {
      title: "Travelmatch",
      date: "2010",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 139,
      },
      content: `
Rapidly prototyped experimental JavaScript search interface concepts for user acceptance testing.
      `,
    },
    "walmart-labs": {
      title: "Walmart Labs",
      date: "2010",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 270,
      },
      content: `
### OneRiot

Delivered front-end templates for a successful redesign that took OneRiot out of beta.
      `,
    },
    "best-buy": {
      title: "Best Buy",
      date: "2009",
      link: "",
      client: {
        title: "Grand Union",
        link: "",
      },
      image: {
        width: 199,
        height: 288,
      },
      content: `
Worked as part of a five-person team building the front end for Best Buy’s UK site, with a particular focus on performance, object-oriented CSS, and asynchronous JavaScript loading.
      `,
    },
    pepsi: {
      title: "Pepsi",
      date: "2008",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 151,
      },
      content: `
### Pepsi MaxCast
      `,
    },
    ask: {
      title: "Ask",
      date: "2007–2008",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 112,
      },
      content: `
Rapidly prototyped interactive behaviours and animations, adaptive and elastic layouts, visual design candidates, and user skins.
      `,
    },
    "financial-careers": {
      title: "Financial Careers",
      date: "2007–2008",
      link: "",
      client: {
        title: "Profit From Play",
        link: "https://profitfromplay.com",
      },
      image: {
        width: 199,
        height: 185,
      },
      content: `
Consulted on the transition from legacy table-based layouts to a modern Web Standards front end. Also coded static HTML/CSS templates for the redesigned editorial section.
      `,
    },
    "house-of-fraser": {
      title: "House of Fraser",
      date: "2007",
      link: "",
      client: {
        title: "LBI",
        link: "http://www.digitaslbi.com/uk/",
      },
      image: {
        width: 199,
        height: 194,
      },
      content: `
Developed advanced functionality for a new online store, including JavaScript animations, AJAX, and server-side integration.
      `,
    },
    usc: {
      title: "USC",
      date: "2007",
      link: "",
      client: {
        title: "LBI",
        link: "http://www.digitaslbi.com/uk/",
      },
      image: {
        width: 199,
        height: 209,
      },
      content: `
Developed AJAX functionality and animated UI behaviours for a redesigned online store.
      `,
    },
    "the-national-lottery": {
      title: "The National Lottery",
      date: "2006",
      link: "",
      client: null,
      image: {
        width: 199,
        height: 284,
      },
      content: `
Served as technical lead on an accessible Web Standards retrofit of national-lottery.co.uk, covering Lotto and EuroMillions gameplay, user registration, and account management.

Led front-end architecture and development, authored company Web Accessibility Guidelines, and conducted usability testing with screen-reader users.
      `,
    },
    "age-concern": {
      title: "Age Concern",
      date: "2005",
      link: "",
      client: null,
      image: {
        width: 199,
        height: 305,
      },
      content: `
### Age Concern Southwark

Designed and developed an accessible <abbr title="Disability Discrimination Act">DDA</abbr>-compliant website for older users.
      `,
    },
  },
};
