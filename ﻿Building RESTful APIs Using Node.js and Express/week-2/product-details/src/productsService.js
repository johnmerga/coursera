//import the DAO layer
const productDao = require("./productDao");

const getProducts = function (done) {
  //call dao getProducts method and pass the parameter
  productDao.getProducts(done);
};

const getProductById = function (id, done) {
  //call dao getProductById method and pass the parameter
  productDao.getProductById(id, done);
};
const saveProductDetails = function (productDetails, done) {
  //call dao saveProductDetails method and pass the parameter
  productDao.saveProductDetails(productDetails, done);
};

const deleteProductById = (productId, done) => {
  //call dao deleteProductById method and pass the parameter
  productDao.deleteProductById(productId, done);
};

module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById,
};
