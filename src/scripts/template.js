const fs = require("fs");
const path = require("path");

const paths = {
  source: path.join(__dirname, "..", "..", "build", "linklog", "index.html"),
  targetDir: path.join(
    __dirname,
    "..",
    "..",
    "netlify",
    "functions",
    "templates",
  ),
};
paths.target = path.join(paths.targetDir, "linklog.html");

/* istanbul ignore next */
const writeTemplate = (overrides = {}) => {
  const deps = {
    fsModule: fs,
    consoleModule: console,
    exit: process.exit,
    ...overrides,
  };
  const { fsModule, consoleModule, exit } = deps;
  try {
    const html = fsModule.readFileSync(paths.source, "utf8");
    fsModule.mkdirSync(paths.targetDir, { recursive: true });
    fsModule.writeFileSync(paths.target, html);
    consoleModule.log(`Wrote Linklog template to ${paths.target}`);
    return true;
  } catch (err) {
    consoleModule.error(`Failed to export Linklog template: ${err.message}`);
    exit(1);
    return false;
  }
};

/* istanbul ignore next */
if (require.main === module) {
  writeTemplate();
}

module.exports = { writeTemplate, paths };
