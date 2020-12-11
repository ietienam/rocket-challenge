//const fs = require("fs");

module.exports = {
  analyzeTasks: (string) => {
    // store input data in an array by splitting new line at removing \r
    let input = string.split("\n").map((m) => m.replace("\r", ""));
    // remove the empty string at the end
    if (input[input.length - 1] === "") {
      input.pop();
    }
    // store every userid in object
    let userid = {};
    for (let i = 1; i < parseInt(input[0]) + 1; i++) {
      if (userid[input[i].split(" ")[0]] === undefined) {
        userid[input[i].split(" ")[0]] = input[i].split(" ")[0];
      }
    }
    // store country every user belongs to
    let userCountry = {};
    for (let i = 1; i < parseInt(input[0]) + 1; i++) {
      if (userCountry[input[i].split(" ")[0]] === undefined) {
        userCountry[input[i].split(" ")[0]] = input[i].split(" ")[1];
      } else {
        userCountry[input[i].split(" ")[0]] += ` ${input[i].split(" ")[1]}`;
      }
    }
    // store time data from task with id and user id
    let timedata = input.slice(parseInt(input[0]) + 2);
    // store calculated averages in object
    let avg = {};
    for (let el of timedata) {
      // calculate total time for userid
      if (el.split(" ")[1] === userid[el.split(" ")[1]]) {
        let count = 1;
        if (avg[el.split(" ")[1]] === undefined) {
          avg[el.split(" ")[1]] = parseInt(el.split(" ")[2]);
        } else {
          count += 1;
          avg[el.split(" ")[1]] += parseInt(el.split(" ")[2]);
          avg[el.split(" ")[1]] /= count;
        }
      }

      for (let key in userCountry) {
        if (el.split(" ")[1] === key) {
          let count = 1;
          if (avg[userCountry[key]] !== undefined) {
            count++;
            avg[userCountry[key]] += parseInt(el.split(" ")[2]);
            avg[userCountry[key]] /= count;
          } else {
            avg[userCountry[key]] = parseInt(el.split(" ")[2]);
          }
        }
      }
    }
    //console.log(Object.entries(avg).join("\n"));
    return Object.entries(avg).join("\n");
  },
};
