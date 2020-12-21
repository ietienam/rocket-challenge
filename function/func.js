const fs = require("fs");
const process = require('./processData');

module.exports = {
  processFile: (string) => {
    let data = fs.readFileSync(string, "utf-8");
    if (!data.includes("\n")) return "Invalid input format";
    return process.processData(data);
  },

  processString: (string) => {
    return process.processData(string);
  },
};
