const { TextEncoder } = require("util");

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
