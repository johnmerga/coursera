const categoryService = require("../service/category.service.js");

/* Call the create method of categoryService object and return the result back*/
exports.create = (newCategory, result) => {
  categoryService.create(newCategory, result);
};

/* Call the getAll method of categoryService object and return the result back */
exports.findAll = (options, result) => {
  categoryService.getAll(options, result);
};

/* Call the findById method of categoryService object and return the result back */
exports.findOne = (categoryId, result) => {
  categoryService.findById(categoryId, result);
};

/* Call the updateById method of categoryService object and return the result back */
exports.update = (categoryId, category, result) => {
  categoryService.updateById(categoryId, category, result);
};

/* Call the remove method of categoryService object and return the result back */
exports.delete = (categoryId, result) => {
  categoryService.remove(categoryId, result);
};

/* Call the removeAll method of categoryService object and return the result back */
exports.deleteAll = (result) => {
  categoryService.removeAll(result);
};
