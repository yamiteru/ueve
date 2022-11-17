const { config } = require("@swc/core/spack");
const path = require("path");

module.exports = config({
  entry: {
    index: path.join(__dirname, "src", "index.ts"),
  },
  output: {
    path: path.join(__dirname, "dist"),
  },
  module: {},
});
