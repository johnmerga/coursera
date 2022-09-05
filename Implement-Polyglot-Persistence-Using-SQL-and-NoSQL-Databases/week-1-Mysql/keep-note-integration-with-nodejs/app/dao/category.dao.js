const connection = require("./db");
sql = connection();

/* constructor to initialize category with category_name, category_description 
and category_creation_date as its properties*/

const Category = function (category) {
  this.category_name = category.category_name;
  this.category_description = category.category_description;
  this.category_creator_id = category.category_creator_id;
};

/* 
  create should be a function that calls the query function on sql object
  to persist category data in MySQL notesdb schema using insert query
*/

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      return result(
        err.sqlMessage || "error occurred while creating categories",
        null
      );
    }

    console.log("created category: ", { id: res.insertId, ...newCategory });
    return result(null, { id: res.insertId, ...newCategory });
  });
};

/* 
  findById should be a function that calls the query function on sql object 
  to fetch the category by the provided Id from the notesdb schema using select query
*/

Category.findById = (categoryId, result) => {
  sql.query(
    `SELECT * FROM categories WHERE category_id = ${categoryId}`,
    (err, res) => {
      if (err) {
        return result("error occurred while fetching Category", null);
      }

      if (res.length) {
        console.log("found category: ", res[0]);
        return result(null, res[0]);
      }

      // not found Category with the id
      return result({ kind: "not_found" }, null);
    }
  );
};

/* 
  getAll should be a function that calls the query function on sql object 
  to fetch all the categories or categories with specific name from the notesdb 
  schema using select query
*/

Category.getAll = (options, result) => {
  let query = "SELECT * FROM categories";
  if (options.category_name) {
    query += ` WHERE category_name = '${options.category_name}'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      return result("error occurred while fetching Category", null);
    }
    if (!res.length) {
      return result({ kind: "not_found" }, null);
    }
    return result(null, res);
  });
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the category for the given id from the notesdb schema using update query
*/

Category.updateById = (id, category, result) => {
  sql.query(
    `UPDATE categories SET ? WHERE category_id='${id}'`,
    category,
    (err, res) => {
      if (err) {
        return result("error occurred while updating Category", null);
      }

      if (res.affectedRows == 0) {
        // not found Category with the id
        return result({ kind: "not_found" }, null);
      }
      return result(null, { id: id, ...category });
    }
  );
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the category for the given id from the notesdb schema using delete query
*/
Category.remove = (id, result) => {
  sql.query("DELETE FROM categories WHERE category_id = ?", id, (err, res) => {
    if (err) {
      return result("error occurred while deleting Category", null);
    }

    if (res.affectedRows == 0) {
      // not found Category with the id
      return result({ kind: "not_found" }, null);
    }
    return result(null, res);
  });
};

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the categories from the notesdb schema using delete query
*/

Category.removeAll = (result) => {
  sql.query("DELETE FROM categories", (err, res) => {
    if (err) {
      return result("error occurred while deleting Category", null);
    }

    return result(null, res);
  });
};
sql.end((err) => {
  if (err) {
    console.log("error occurred while closing the connection");
  }
  console.log("connection closed");
});
module.exports = Category;
