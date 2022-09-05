const categoryDAO = require("../dao/category.dao");

/* Create and Save a new Category by calling categoryDAO create method.
   Depending on the return value, it should return the results or the error message*/
exports.create = (newCategory, result) => {
  categoryDAO.create(newCategory, result);
};

/* Retrieve all categories by calling categoryDAO getAll method.
 Depending on the return value, it should return the results or the error message*/
exports.getAll = (options, result) => {
  categoryDAO.getAll(options, result);
};

/* Find a single Category by Id by calling categoryDAO findById method.
Depending on the return value, it should return the results or the error message*/
exports.findById = (categoryId, result) => {
  categoryDAO.findById(categoryId, result);
};

/* Update a Category identified by the id by calling categoryDAO updateById method.
Depending on the return value, it should return the results or the error message*/
exports.updateById = (categoryId, category, result) => {
  categoryDAO.updateById(categoryId, category, result);
};

/* Delete a Category with the specified id by calling categoryDAO remove method.
Depending on the return value, it should return the results or the error message*/
exports.remove = (categoryId, result) => {
  categoryDAO.remove(categoryId, result);
};

/* Delete all Categories by calling categoryDAO removeAll method.
Depending on the return value, it should return the results or the error message*/
exports.removeAll = (result) => {
  categoryDAO.removeAll(result);
};
