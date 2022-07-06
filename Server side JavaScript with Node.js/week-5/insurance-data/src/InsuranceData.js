//import all the modules require
const fs = require("fs");
const readline = require("readline");

const _ = require("lodash");

//Use try and catch to handle the error where ever required
//return the callback with appropriate data where ever require in all the methods

//More userdefined methods can be written if required to write the logical stuff

//This method will take two parameters first the fileName
//and second a callback
//read file data line by line using readLine
//create array and push all data inside the array

const readFileContentsLineByLine = (fileName, cb) => {
  let fileContents = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false,
  });

  try {
    rl.on("line", (line) => {
      fileContents.push(line);
    }).on("close", () => {
      cb(null, fileContents);
    });
  } catch (error) {
    cb(error, null);
  }
};

//This method will take two parameters first the filecontent
//and second the callback
//use map to filter the data
//Filter all the records for female candidates given region as southwest.

const filterFemaleCandidates = (fileContents, cb) => {
  let filteredData;

  //use lodash.compact() method if required
  try {
    filteredData = _.filter(
      fileContents,
      (user) => user.includes("female") && user.includes("southwest")
    );
    cb(null, filteredData);
  } catch (error) {
    cb(error, null);
  }
};

//This method will write filtered data in the output file
const writeFilteredDataToFile = (outputFileName, filteredData, cb) => {
  //use writeFile method to write the filteredData
  fs.writeFile(outputFileName, filteredData, (err) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, "successfully created");
    }
  });
};

//This method will read the file content using Streams
//create array and push all the data from file to it

const readFileContentsUsingStream = (fileName, cb) => {
  let fileContents = [];
  const countLine = ((i=0)=>()=>++i)()
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
    });
    rl.on("line", (line, lineNum = countLine()) => {
      if (lineNum > 1) {
        fileContents.push(line);
      }
    }).on("close", () => {
      cb(null, fileContents);
    });

    fs.createReadStream(fileName).on("error", (err) => {
      console.log(
        "Error while reading contents of file using streams, ERROR::",
        err
      );
      cb("Encountered error while reading file contents using streams..!");
    });
  } catch (error) {
    cb(error, null);
  }
};

//This method will filetDatewithNoChildren it will take two parameters
//first the fileContent and second the callback
//use map if required to filter the data

const filterDataWithNoChildren = (fileContents, cb) => {
  let filteredData = [];
  try {
    const file = readline.createInterface({
      input: fs.createReadStream(fileContents),
    });
    file
      .on("line", (line) => {
        const SingleArrayData = line.split(",");
        if (SingleArrayData[3] == 0) {
          filteredData.push(SingleArrayData);
        }
      })
      .on("close", () => {
        cb(null, filteredData);
      });
  } catch (error) {
    cb(error);
  }
};
module.exports = {
  readFileContentsLineByLine,
  filterFemaleCandidates,
  readFileContentsUsingStream,
};
