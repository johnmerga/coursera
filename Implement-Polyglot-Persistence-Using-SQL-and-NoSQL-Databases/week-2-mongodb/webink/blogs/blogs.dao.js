const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "blogmanagementDB";

const saveBlog = async function (blog, done) {
  // establish connection with mongo

  // insert blog document to blogs collection of blogmanagementDB database
  try {
    await client.connect();
    const insertResult = await client
      .db(dbName)
      .collection("blogs")
      .insertOne(blog);
    // store the insert command result in insertResult

    if (!insertResult) {
      console.log("Error in saving blog, ERROR::");

      // EXITING
      return done("Failed to save blog due to data errors..!");
    }

    // EXITING with results
    return done(null, blog);
  } catch (error) {
    return done(error);
  } finally {
    await client.close();
  }
};

const findBlogs = async function (done) {
  // establish connection with mongo

  // fetch all blogs from blogs collection of blogmanagementDB database
  try {
    await client.connect();
    const findResult = await client
      .db(dbName)
      .collection("blogs")
      .find({})
      .toArray();

    // store the find command result in findResult

    if (!findResult) {
      console.log("Error in fetching blogs");

      // EXITING
      return done("Failed to fetch blogs due to data errors..!");
    }

    // EXITING with results
    return done(null, findResult);
  } catch (error) {
    return done(error);
  } finally {
    await client.close();
  }
};

module.exports = {
  saveBlog,
  findBlogs,
};
