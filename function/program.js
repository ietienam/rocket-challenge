const func = require("./func");

module.exports = {
  analyzeTasks: (string) => {
    if (typeof string == "string") {
      if (string.includes("\n")) {
        return func.processString(string);
      } else if (string.includes(".txt")) {
        return func.processFile(string);
      } else {
        return "Invalid input format";
      }
    } else {
      return "Invalid input format";
    }
  },
};
