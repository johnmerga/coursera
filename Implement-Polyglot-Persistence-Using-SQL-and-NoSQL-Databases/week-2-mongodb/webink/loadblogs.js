const papaparse = require("papaparse");
const fs = require("fs");
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "blogmanagementDB";

// Read csv file and save the blogs data
function readBlogs() {
  // CSV file is considered to be of format utf-8

  let blogs = [];
  // Papa parse being used to convert the CSV data to json format.
  // Considers each row, except first as the data fields
  papaparse.parse(fs.readFileSync("./resources/blogsdata.csv", "utf-8"), {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      blogs = results.data;
    },
  });

  return blogs;
}
// console.log(readBlogs());
// Read csv file and save the users data
function readUsers() {
  // CSV file is considered to be of format utf-8

  let users = [];
  // Papa parse being used to convert the CSV data to json format.
  // Considers each row, except first as the data fields
  papaparse.parse(fs.readFileSync("./resources/usersdata.csv", "utf-8"), {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      users = results.data;
    },
  });

  return users;
}

const blogs = readBlogs();

const users = readUsers();

const blogsWithUser = blogs.map((blog) => {
  return {
    _id: blog.blogId,
    blogTitle: blog.blogTitle,
    description: blog.description,
    user: Object.assign(
      {},
      ...users.filter((user) => user.userId === blog.userId)
    ),
  };
});

async function insertBlogsData() {
  // Use connect method to connect to the server
  // Insert all the records at once using insertMany.
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const blogsCollection = db.collection("blogs");
  const result = await blogsCollection.insertMany(blogsWithUser);

  // The schema for blogs will be considered same as the JSON structure.
  // If specific schema to be followed then formulat the structure explicitly

  // the following code examples can be pasted here...

  // Close connection
  client.close();

  return "done.";
}

module.exports = insertBlogsData;
