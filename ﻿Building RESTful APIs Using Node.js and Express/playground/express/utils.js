const fs = require("fs");
const { createRequire } = require("module");
const numberInput = process.argv[2];

const createUsersList = (numberInput) => {
  const usersList = [];
  for (let i = 0; i < numberInput; i++) {
    usersList.push({
      id: i,
      name: `User ${i}`,
      age: Math.floor(Math.random() * 100),
    });
  }
  return fs.writeFile("./users.json", JSON.stringify(usersList), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

createUsersList(numberInput);
