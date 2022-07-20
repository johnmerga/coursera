//import fs module
const fs = require("fs");
const path = require("path");

const fileDir = path.join(__dirname, "products.json");
//The getProducts function take done as callback
//It will read the product.json file

const getProducts = function (done) {
  //parse the fileContent and save it in another variable say productData
  //return the callback with first parameter as undefined and second parameter as productData
  fs.readFile(fileDir, function (err, data) {
    if (err) {
      return done(err);
    }
    let productData = JSON.parse(data);
    done(undefined, {
      STATUS: "OK",
      data: productData,
    });
  });
};

//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function (id, done) {
  //write all the logical steps
  //return the callback with first parameter as undefined and second parameter as productDetails
  try {
    fs.readFile(fileDir, function (err, data) {
      if (err) {
        return done(err);
      }
      let productData = JSON.parse(data);
      let productDetails = productData.find((product) => product.id == +id);
      if (!productDetails) {
        return done({
          STATUS: "ERROR",
          message: "Product not found",
        });
      }
      done(undefined, {
        STATUS: "OK",
        data: productDetails,
      });
    });
  } catch (err) {
    done(err);
  } //end of try catch
};


//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  //write all the logical steps
  //parse the fileContent and save it in another variable say productData
  //push the productDetails in the productData
  //Write the productData into the file
  //return the callback with undefined and ProductDetails
  try {
    fs.readFile(fileDir, function (err, data) {
      if (err) {
        return done(err);
      }
      let productData = JSON.parse(data);
      productData.push(ProductDetails);
      fs.writeFile(fileDir, JSON.stringify(productData), function (err) {
        if (err) {
          return done(err);
        }
        done(undefined, {
          STATUS: "OK",
          data: ProductDetails,
        });
      });
    });
  } catch (err) {
    done(err);
  } //end of try catch
};

//The method deleteProductById will take productId and done as parameters
//It will read the product.json file

const deleteProductById = function (productId, done) {
  //Write all the logical steps
  //return the callback with first parameter as undefined and second parameter as productDetails
  try {
    fs.readFile(fileDir, function (err, data) {
      if (err) {
        return done(err);
      }
      let productData = JSON.parse(data);
      let productDetails = productData.find(
        (product) => product.id == +productId
      );
      productData.splice(productData.indexOf(productDetails), 1);
      fs.writeFile(fileDir, JSON.stringify(productData), function (err) {
        if (err) {
          return done(err);
        }
        done(undefined, {
          STATUS: "OK",
          data: productDetails,
        });
      });
    });
  } catch (err) {
    done(err);
  } //end of try catch
};

module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById,
};
