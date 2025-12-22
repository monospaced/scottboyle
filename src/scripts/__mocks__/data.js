const data = {
  url: "https://scottboyle.uk",
  title: "Scott Boyle",
  subtitle: "Portfolio",
  description:
    "Portfolio for Scott Boyle, freelance web developer based in London, UK.",
  about: `
<span class="fn">Scott Boyle</span> is a <span class="category">web professional</span> <span class="note">specialising in modern front-end development</span>. Scott currently lives in <span class="adr"><span class="locality">London</span> <span class="country-name">UK</span></span> and has a company called <a href="https://monospaced.com" class="org">Monospaced&nbsp;Ltd</a>, a freelance web development consultancy working with regular clients in London and around the&nbsp;world.

### View source

<a href="https://github.com/monospaced/scottboyle" rel="source">github.com/monospaced/scottboyle</a>
  `,
  projects: {
    "thomson-reuters": {
      title: "Thomson Reuters",
      date: "2018",
      link: "https://www.thomsonreuters.com/en.html",
      client: {
        title: "Monospaced",
        link: "https://monospaced.com",
      },
      image: {
        width: 398,
        height: 275,
      },
      content: `
Building a design system and React component&nbsp;library.
      `,
    },
    "compass-group": {
      title: "Compass Group",
      date: "2017",
      link: "",
      client: {
        title: "Monospaced",
        link: "https://monospaced.com",
      },
      image: {
        width: 398,
        height: 244,
      },
      content: `
### Retail Pricing Portal

UI design and complete front-end build, Angular NgRx web&nbsp;app.
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
      link: "http://genesreunited.co.uk",
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
Technical lead on an accessible Web Standards retrofit of key areas of national-lottery.co.uk, including the Lotto and EuroMillions purchase processes, user registration and account&nbsp;management.

Responsible for front-end architecture and all front-end development. Authored company Web Accessibility Guidelines, and conducted usability testing with screen-reader&nbsp;users.
      `,
    },
    "age-concern": {
      title: "Age Concern",
      date: "2005",
      link: "",
      client: {
        title: "Two Plus Four",
        link: "",
      },
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

export default data;
