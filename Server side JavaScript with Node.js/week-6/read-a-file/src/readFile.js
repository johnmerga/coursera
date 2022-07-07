const fs = require("fs");
// import the lodash library
const lodash = require("lodash");

// Read the file data and return the data in the resolved Promise
const read = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        return reject("Encountered error while reading file contents..!");
      }

      return resolve(data.split(","));
    });
  });
};

// Define a function to Convert the file content to upper case and return the result in the resolved Promise
const convertToUpperCase = (fileContents) => {
  return new Promise((resolve, reject) => {
    try {
      const upperCaseFileContents = lodash.map(fileContents, (item) => {
        return item.toUpperCase();
      });
      resolve(upperCaseFileContents);
    } catch (err) {
      reject(err);
    }
  });
};
// Define a function to read and convert the file contents, use the then and catch blocks here
const readAndConvertFileContents = (fileName, cb) => {
  read(fileName)
    .then((fileName) => convertToUpperCase(fileName))
    .then((fileName) => cb(null, fileName))
    .catch((err) => cb(err, null));
};
module.exports = {
  readAndConvertFileContents,
};
