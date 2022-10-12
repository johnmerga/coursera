const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("failed to establish connection to MongoDB"));

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: ");
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is disconnected");
});

const dao = require("./project/project.dao");
// const projectData = {
//   premiseType: "intern",
//   size: "5",
//   budget: "13$",
//   ownership: "NGO",
//   rooms: 15,
// };
// dao.saveProject(projectData, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// findAll project
// const userQuery = {
// //   premiseType: "fake",
// //   ownership: "NGO",
// };
// dao.findAllProject(userQuery, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// update

dao.updateProjectDetail(
  "632a21e206d89dbb410b1a65",
  {
    ownership: "Public Health",
    size: "9",
  },
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }
);
