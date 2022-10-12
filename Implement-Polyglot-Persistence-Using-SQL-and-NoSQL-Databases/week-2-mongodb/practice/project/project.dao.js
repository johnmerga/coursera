const ProjectModel = require("./project.entity");

const saveProject = function (projectReq, done) {
  let newProject = new ProjectModel({
    premiseType: projectReq.premiseType,
    size: projectReq.size,
    budget: projectReq.budget,
    ownership: projectReq.ownership,
    rooms: projectReq.rooms,
  });

  newProject.save((err, savedProject) => {
    if (err) {
      console.log("error occurred while saving new Project");
      return done(err);
    }
    return done(null, savedProject);
  });
};

// findAllProject
const findAllProject = function (userQuery, done) {
  let query = {};
  if (userQuery) {
    let queryKeys = Object.keys(userQuery);
    for (let i = 0; i < queryKeys.length; i++) {
      query[queryKeys[i]] = userQuery[queryKeys[i]];
    }
  }
  console.log(query);
  ProjectModel.find(query)
    // include or exclude fields
    .select({
      _id: 0,
      __v: 0,
    })
    // convert to plain javascript object
    .lean()
    .exec((err, projects) => {
      if (err) {
        console.log("error occurred while fetching all projects");
        return done(err);
      }
      return done(null, projects);
    });
};

// updated project
const updateProjectDetail = function (projectID, projectReq, done) {
  ProjectModel.findOneAndUpdate(
    {
      _id: projectID,
    },
    projectReq,
    {
      // return the updated document
      new: true,
    },
    (err, updatedProject) => {
      if (err) {
        console.log(
          `error occurred while updating projectDetail with ID ${projectID}`
        );
        return done(err);
      }
      if (updatedProject == null) {
        console.log("no project found");
        return done(`no project found with ID ${projectID}`);
      }
      return done(null, updatedProject);
    }
  );
};

module.exports = {
  saveProject,
  findAllProject,
  updateProjectDetail,
};
