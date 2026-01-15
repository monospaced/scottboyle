const data = {
  url: "https://example.test",
  title: "Test Name",
  subtitle: "Test Subtitle",
  description: "Short description used in tests.",
  linklogErrorMessage: "Linklog error message.",
  about: `
Test bio for mocks.

- Item one
- Item two
  `,
  projects: {
    alpha: {
      title: "Project Alpha",
      date: "2024",
      link: "https://example.com/alpha",
      client: {
        title: "Client Co",
        link: "https://example.com",
      },
      image: {
        width: 400,
        height: 300,
      },
      content: `
Alpha project description.
      `,
    },
    beta: {
      title: "Project Beta",
      date: "2023",
      link: "",
      client: null,
      image: {
        width: 320,
        height: 200,
      },
      content: `
Beta project description.
      `,
    },
  },
};

export default data;
