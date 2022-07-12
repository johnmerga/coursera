// Import the necessary dependencies
const { isArray } = require("lodash");
const lodash = require("lodash");
const productsList = require("./products.json").products;

/**
 * Get all products
 * @returns JSON.stringify(productsList)
 */
const getProducts = () => {
  // get all products
  if (!isArray(productsList)) {
    throw new Error("Products list is not an array");
  } else {
    return JSON.stringify(productsList);
  }
};

/**
 * It takes a product ID and a callback function as arguments, and returns the product details as a
 * string if the product exists, or an error message if the product doesn't exist
 * @param productId - The ID of the product to be retrieved.
 * @param done - A callback function that is called when the operation is complete.
 */
const getProductsById = (productId, done) => {
  // get a product by ID
  if (isNaN(+productId)) {
    done(`invalid Product ID: ${productId}`);
  } else if (!isArray(productsList)) {
    done("Products list is not an array");
  } else {
    const product = productsList.find((p) => p.id === +productId);
    if (!product) {
      return done(`Requested product doesn't exist..!`);
    }
    return done(null, JSON.stringify(product));
  }
};

/**
 * It takes a new product object and a callback function as arguments, checks if the product already
 * exists, and if not, adds it to the products list
 * @param newProduct - The new product to be saved.
 * @param done - A callback function that is called when the operation is complete. It takes two
 * parameters:
 */
const saveProduct = (newProduct, done) => {
  // save a product
  const requiredKeys = ["id", "name", "description", "price", "quantity"];
  const inputKeys = Object.keys(newProduct);
  // check the type of newProduct
  if (!typeof newProduct === "object") {
    return done(
      "error while trying to parsing to an object or product list is not an array"
    );
  }

  const product = {};
  const index = productsList.find((p) => p.id === newProduct.id);
  if (index) {
    return done("Product already exists..!");
  }
  // check if all the required keys are present in the input object
  else if (
    !(
      requiredKeys.every((key) => inputKeys.includes(key)) &&
      inputKeys.every((key) => requiredKeys.includes(key))
    )
  ) {
    return done("input field didn't match");
  }

  requiredKeys.forEach((key) => {
    product[key] = newProduct[key];
  });
  productsList.push(product);
  done(null, JSON.stringify(productsList));
};

/**
 * It updates the product list with the given product id and the update data
 * @param productId - The ID of the product to update.
 * @param updateData - The data to update the product with.
 * @param done - A callback function that you should call when you're done.
 * @returns the product list
 */
const updateProduct = (productId, updateData, done) => {
  // update the product list
  const requiredKeys = ["name", "description", "price", "quantity"];
  const inputKeys = Object.keys(updateData);
  // check if it's an object

  if (isNaN(+productId) || !typeof updateData === "object") {
    return done(
      "error while trying to parsing to an object or product list is not an array"
    );
  }

  const index = productsList.findIndex((p) => p.id === +productId);
  if (index === -1) {
    return done("Requested product doesn't exist..!");
  }
  // check if all the required keys are present in the input object
  else if (!requiredKeys.every((key) => inputKeys.includes(key))) {
    return done("input field didn't match");
  }
  // check if the ID also trying to update
  else if (updateData.id && +productId !== updateData.id) {
    return done("can't update the id");
  }

  requiredKeys.forEach((key) => {
    productsList[index][key] = updateData[key];
  });

  done(null, JSON.stringify(productsList));
};

/**
 * It deletes a product from the products list
 * @param productId - The ID of the product to be deleted.
 * @param done - A callback function that is called when the operation is complete.
 */
const deleteProduct = (productId, done) => {
  // delete a product
  if (isNaN(+productId)) {
    return done(`invalid Product ID: ${productId}`);
  } else if (!isArray(productsList)) {
    return done("Products list is not an array");
  } else {
    const index = productsList.findIndex((p) => p.id === +productId);
    if (index === -1) {
      return done("Requested product doesn't exist..!");
    }
    productsList.splice(index, 1);
    
    done(null, JSON.stringify(productsList));
  }
};

module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
