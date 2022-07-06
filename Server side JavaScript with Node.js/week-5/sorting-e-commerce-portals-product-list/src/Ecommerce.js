//import all the require modules
const fs = require("fs");

//write try catch to handle the exceptions

//More userDefined methods can be written if required to write the logical stuff

//return the callback with appropriate data where ever require in all the methods

//This method will read the file it takes two parameters first the fileName
//and second the callback
const readFileContents = (fileName, cb) => {
  const fileContents = [];
  const countLine = (
    (i = 0) =>
    () =>
      ++i
  )();
  try {
    //read the file
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        cb("Encountered error while reading file contents..!", null);
      } else {
        //split the data into array of lines
        const lines = data.split("\n");
        //iterate over the lines and split the line into array of words
        lines.forEach((line, lineNum = countLine()) => {
          if (lineNum > 1) {
            const words = line.split(",");
            //push the words in the fileContents array
            fileContents.push(words);
          }
        });
        //return the callback with fileContents
        cb(null, fileContents);
      }
    });
  } catch (error) {
    cb(error, null);
  }
};

//This method will sortDataOnPrice it will take two parameters one is fileContent
//second the callback
const sortDataOnPrice = (fileContents, cb) => {
  //use lodash.sortBy()

  try {
    //use lodash.sortBy()
    const sortedData = fileContents.sort((a, b) => {
      return a.retail_price - b.retail_price;
    });
    cb(null, sortedData);
  } catch (error) {
    cb(error, null);
  }
};

//This method will sortDataOnRating
const sortDataOnRating = (fileContents, cb) => {
  //use map where ever required

  //use lodash sortBy() and compact() if required

  //use lodash.reverse() if required

  try {
    //use lodash.sortBy()
    const sortedData = fileContents
      .filter((item) => item.product_rating !== "No rating available")
      .sort((a, b) => {
        return b.product_rating - a.product_rating;
      });
    cb(null, sortedData);
  } catch (error) {
    cb(error, null);
  }
};

//This method will write the sortedData in the output file
const writeSortedDataToFile = (outputFileName, sortedData, cb) => {};

module.exports = {
  readFileContents,
  sortDataOnPrice,
  sortDataOnRating,
};
