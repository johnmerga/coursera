//import all the require module
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const _ = require("lodash");



//Write try and catch and handle the exceptions where ever require
//return the callback with appropriate values in the methods

//More userdefined methods can be written if required to write the logical stuff
////This method will read the file content the first parameter is filename and
//second is a callback
//create array name it as  fileContents
const readFileContents = (fileName, cb) => {
  let fileContents = [];
  // line_counter is used to count the number of lines in the file
  const line_counter = (
    (i = 0) =>
    () =>
      ++i
  )();

  try {
    const rd = readline.createInterface({
      input: fs.createReadStream(fileName),
    });
    rd.on("line", (line, lineno = line_counter()) => {
      // start from the second line
      if (lineno > 1) {
        fileContents.push(line);
      }
    }).on("close", () => {
      cb(null, fileContents);
    });
  } catch (err) {
    cb(err, null);
  }

  //push row by row data in the array created
};

// Use Lodash to filter the data this method will take first parameter
//as fileContents and second parameter as a callback
const filterData = (fileContents, cb) => {
  let filteredData;
  try {
    filteredData = _.filter(fileContents, (row) => {
      return row.payment_method === "credit";
    });
    cb(null, filteredData);
  } catch (err) {
    cb(err, null);
  }
};

//This method will writeFile data to output.txt file
//it is taking parameters are filteredData and a callback
//filteredata will be given by the filterData method
const writeFilteredDataToFile = (filteredData, cb) => {
  try {
    //use writeFile method and write the filteredData in output.txt file
    fs.writeFile("output.txt", JSON.stringify(filteredData), (err) => {
      if (err) {
        cb(err, null);
      }
      cb(null, "Successfully wrote filtered data to output.txt file..!");
    });
  } catch (err) {
    cb(err, null);
  }
};

module.exports = {
  readFileContents,
  filterData,
  writeFilteredDataToFile,
};
