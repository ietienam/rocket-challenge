module.exports = {
  processData: (string) => {
    // store input data in an array by splitting new line at removing \r
    let input = string.split("\n").map((m) => m.replace("\r", ""));
    // remove the empty string at the end
    if (input[input.length - 1] === "") {
      input.pop();
    }
    // store every userid in object 1 1
    let userid = {};
    for (let i = 1; i < parseInt(input[0]) + 1; i++) {
      if (userid[input[i].split(" ")[0]] === undefined) {
        userid[input[i].split(" ")[0]] = input[i].split(" ")[0];
      }
    }
    // store country every user belongs to US 1
    let userCountry = {};
    for (let i = 1; i < parseInt(input[0]) + 1; i++) {
      if (userCountry[input[i].split(" ")[0]] === undefined) {
        userCountry[input[i].split(" ")[0]] = input[i].split(" ")[1];
      } else {
        userCountry[input[i].split(" ")[0]] += ` ${input[i].split(" ")[1]}`;
      }
    }
    // store time data from task with id and user id [taskid userid seconds]
    let timedata = input.slice(parseInt(input[0]) + 2);
    //console.log(timedata)
    // store calculated averages in object {userid: average, countryCode: average}
    let avg = {};
    // monitor how many times a value occurs more than once to calculate average
    let count = 1;
    // loop through timedata array
    for (let el of timedata) {
      // check if userid in timedata array exists in userid object
      if (el.split(" ")[1] === userid[el.split(" ")[1]]) {
        // check if the userid already has an entry in the average object
        if (avg[el.split(" ")[1]] === undefined) {
          // if id doesnt, make new entry
          avg[el.split(" ")[1]] = parseInt(el.split(" ")[2]);
          avg[el.split(" ")[1]] = avg[el.split(" ")[1]].toFixed(2);
        } else {
          // if it does, increase count and calculate running average
          count += 1;
          avg[el.split(" ")[1]] = avg[el.split(" ")[1]] * (count - 1);
          //console.log('after multiple by count',avg[el.split(" ")[1]])
          avg[el.split(" ")[1]] += parseInt(el.split(" ")[2]);
          //console.log('after addition to multiple',avg[el.split(" ")[1]])
          avg[el.split(" ")[1]] /= count;
          avg[el.split(" ")[1]] = avg[el.split(" ")[1]].toFixed(2);
          //console.log('after division by count',avg[el.split(" ")[1]])
        }
      }

      // loop through country object {countryCode: userid}
      for (let key in userCountry) {
        // store the country code in the average object with its corresponding data in average obj
        avg[userCountry[key]] = avg[key];
        // if the code has no corresponding value in avg obj, set it to 0
        if (avg[userCountry[key]] === undefined)
          avg[userCountry[key]] = parseInt("0.00").toFixed(2);
      }
    }

    // loop through userid obj to check if any userid performed no task
    for (key in userid) {
      if (avg[key] === undefined) {
        // set the userid value in avg obj to 0
        avg[key] = parseInt("0.00").toFixed(2);
      }
    }
    // sort data
    let userTime = Object.entries(avg).slice(
      parseInt(input[0]) - parseInt(input[0]),
      parseInt(input[0])
    );
    userTime = userTime.sort((a, b) => a[1] - b[1]);
    let countryTime = Object.entries(avg).slice(parseInt(input[0]));
    countryTime = countryTime.sort((a, b) => a[1] - b[1]);

    // return sorted data
    return [...userTime, ...countryTime].join("\n").replace(/[,]/g, " ");
  },
};
