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

const writeTemplate = () => {
  try {
    const html = fs.readFileSync(paths.source, "utf8");

    fs.mkdirSync(paths.targetDir, { recursive: true });
    fs.writeFileSync(paths.target, html);
    console.log(`Wrote Linklog template to ${paths.target}`);

    return true;
  } catch (err) {
    console.error(`Failed to export Linklog template: ${err.message}`);
    process.exit(1);

    return false;
  }
};

/* istanbul ignore next */
if (require.main === module) {
  writeTemplate();
}

module.exports = { paths, writeTemplate };
