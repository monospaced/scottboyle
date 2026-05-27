import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createLinklogPageHandler } from "../lib/linklog-page-handler.mjs";

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(moduleDir, "templates", "linklog.html");

const handler = createLinklogPageHandler({
  readTemplate: () => fs.readFileSync(templatePath, "utf8"),
});

export default handler;
