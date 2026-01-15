const url = "https://scottboyle.uk";

module.exports = {
  url,
  title: "Scott Boyle",
  subtitle: "Portfolio",
  description:
    "Web professional specialising in design engineering and modern front-end development.",
  about: `
<a class="fn uid url" href="${url}" translate="no">Scott Boyle</a>&nbsp;(<span class="nickname" translate="no">monospaced</span>) is a <span class="category">web professional</span> <span class="note">specialising in modern front-end development</span>.

<span translate="no">Scott</span>&nbsp;lives in <span class="adr"><span class="locality">London</span>, <span class="country-name">UK</span></span>, and is the Principal Design Engineer at <a class="org" href="https://measured.co" translate="no">Measured</a>, a web UI consultancy working with clients across the UK and around the world.

### Contact

* <a href="mailto:scott@measured.co" class="email">scott@measured.co</a>

### Elsewhere

* <a href="https://github.com/monospaced" rel="me" translate="no">GitHub</a>
* <a href="https://www.linkedin.com/in/scottboyle/" rel="me" translate="no">LinkedIn</a>
  `,
  linklogErrorMessage: "Unable to load linklog.",
  projects: {
    hilton: {
      title: "Hilton",
      date: "2022–2025",
      link: "https://www.hilton.com",
      image: {
        width: 398,
        height: 224,
      },
      content: `
Multi-brand design system.
      `,
    },
    hubble: {
      title: "Hubble",
      date: "2019–2023",
      link: "https://www.hubblehq.com",
      image: {
        width: 398,
        height: 230,
      },
      content: `
Migrated Hubble’s site from AngularJS to React and architected a UI system to support their new brand.
      `,
    },
    bt: {
      title: "BT",
      date: "2020–2022",
      link: "https://ui.digital-ent-int.bt.com/latest/",
      image: {
        width: 398,
        height: 267,
      },
      content: `
Developing the Arc UI System for BT Enterprise.
      `,
    },
    refinitiv: {
      title: "Refinitiv",
      date: "2018–2019",
      link: "https://forge.refinitiv.com",
      image: {
        width: 398,
        height: 269,
      },
      content: `
Created a CSS webpack build solution to rebrand the Thomson Reuters web platform for Refinitiv. The solution produced significant cost savings for both&nbsp;businesses.
      `,
    },
    "thomson-reuters": {
      title: "Thomson Reuters",
      date: "2017–2019",
      link: "https://www.thomsonreuters.com/en.html",
      image: {
        width: 398,
        height: 312,
      },
      content: `
Building a design system and React component&nbsp;library.
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
Complete build and project delivery of a complex single-page web application. Highcharts data visualisation, Redux state management and Jest unit&nbsp;testing.

Also a full marketing website build, front end and CMS&nbsp;(Perch).
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
Assisted Hanno with front-end development of Evolv&nbsp;microsite.
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

UI design and complete front-end build, Angular NgRx web&nbsp;app.
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
Complete front-end build, React/Webpack static site&nbsp;generator.
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
Technical specifications and complete AngularJS front-end build. Stripe payments integration, CI and AWS infrastructure management, PCI compliance. Working in close collaboration with .NET API developers and the product&nbsp;team.
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
Building full stack  prototypes and technical experiments utilising a variety of  technologies. Node.js, React, AngularJS and Angular, Ionic. OpenCV, Leap Motion, Alexa Skills, Facebook Messenger Platform,&nbsp;etc.
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
Front-end template builds for responsive homepage project, mobile app prototypes, and website&nbsp;refresh.
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

Managed the delivery of this content&nbsp;website.
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
Front-end design and build for a family tree web app built in AngularJS. Complex diagram views built completely in&nbsp;CSS.
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

Complete front-end templates for redesign of efinancialnews.com. Semantic HTML and object-oriented CSS produced a lightweight, accessible and SEO friendly&nbsp;site.
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
Prototype web e-book reader for digital library startup. Lives on as an open source project:&nbsp;[Paperback](https://monospaced.github.io/paperback/).
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
Consulting and advising on a site-wide design refresh. Created indicative templates and assisted with&nbsp;integration.
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
Full website build, front end and CMS&nbsp;(WordPress).
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
Lead front-end developer for portal website aimed at the global Chinese professional community. Working in close collaboration with Ruby on Rails developers and the product&nbsp;team.
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
Requirements gathering, front-end development, back-end design and development (PHP/MySQL). Bespoke CMS, search integration, deployment, search engine and performance&nbsp;optimisation.
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
Responsible for all aspects of site development. From static templates to form functionality, CMS integration, and site&nbsp;deployment.
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

JavaScript animations and data integration: counters, odometers, tickers and sound&nbsp;fx!
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

Front-end templates for this competition&nbsp;microsite.
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

Skinning and configuring&nbsp;MediaWiki.
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

Responsible for Google Maps API search and display&nbsp;functionality.
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
Rapid prototyping of experimental JavaScript search interface concepts for user acceptance&nbsp;testing.
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

Front-end templating for a successful redesign, taking OneRiot out of beta. Object-oriented CSS and  JavaScript&nbsp;animations.
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
Part of a 5 person team building the front end for Best Buy’s UK site. Particular focus on performance, object-oriented CSS, and asynchronous JavaScript&nbsp;loading.
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
Rapid prototyping of interactive behaviours and animations. Adaptive/elastic layouts, visual design candidates and user&nbsp;skins.
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
Consulting on transition from legacy table-based layouts to modern Web Standards front end. Also responsible for coding static HTML/CSS templates for the redesigned editorial&nbsp;section.
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
Developed advanced functionality for a new online store. JavaScript animations, AJAX and server-side&nbsp;integration.
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
Developed AJAX functionality and animated UI behaviours for a redesigned online store. Accessible and unobtrusive integration of complex Flash elements and Adobe Scene7&nbsp;API.
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
Technical lead on an accessible Web Standards retrofit of national-lottery.co.uk. Lotto and EuroMillions gameplay, user registration and account&nbsp;management.

Responsible for front-end architecture and all front-end development. Authored company Web Accessibility Guidelines, and conducted usability testing with screen-reader&nbsp;users.
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

Responsible for designing and developing an accessible <abbr title="Disability Discrimination Act">DDA</abbr> compliant website for older&nbsp;users.
      `,
    },
  },
};
