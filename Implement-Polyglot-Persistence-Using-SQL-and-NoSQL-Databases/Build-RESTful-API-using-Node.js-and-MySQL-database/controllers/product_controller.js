const Product = require("../dao/product_dao");

/**
 * It creates a new product and saves it in the database
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const createProduct = (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        status: "error",
        message: "Content can not be empty!",
      });
    } else {
      const requiredFields = ["name", "description", "price"];
      const newEntireKeys = Object.keys(req.body);
      const isValid = checkFieldValidation(requiredFields, newEntireKeys);
      if (!isValid) {
        return res.status(400).send({
          status: "Error",
          message: "Fields didn't match",
        });
      }

      // create a new product object
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      });
      // save product in database
      Product.create(newProduct, (err, data) => {
        if (err) {
          res.status(500).send({
            status: "error",
            message: "Error occurred while creating the Product",
          });
        }
        res.status(200).send({
          status: "success",
          data: data,
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * It gets all products from the database
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const getAllProducts = (req, res) => {
  try {
    let parameter = req.query.name || "";

    Product.getAll(parameter, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            status: "error",
            message: "there's no product. No products added yet",
          });
        }
        return res.status(500).send({
          status: "error",
          message: "Error occurred while getting all products",
        });
      }
      return res.status(200).send({
        status: "success",
        data: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * It gets a product by its id
 * @param req - The request object.
 * @param res - The response object.
 */
const getProductById = (req, res) => {
  try {
    const productId = req.params.productId;
    Product.findById(productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            status: "error",
            message: "Product not found",
          });
        }
        return res.status(500).send({
          status: "error",
          message: "Error occurred while getting the product",
        });
      }

      return res.status(200).send({
        status: "success",
        data: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * It gets all the products that are more expensive than the price specified in the query parameter
 * @param req - The request object.
 * @param res - The response object.
 */
const getCostlyProducts = (req, res) => {
  try {
    const price = req.query.price || 0;
    Product.getCostlyProducts(price, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            status: "error",
            message: "Product not found",
          });
        }
        return res.status(500).send({
          status: "error",
          message: "Error occurred while getting the products",
        });
      }
      return res.status(200).send({
        status: "success",
        data: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * It updates a product by its id
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const updateProductById = (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        status: "error",
        message: "Content can not be empty!",
      });
    }
    const productId = req.params.productId;
    const requiredFields = ["name", "description", "price"];
    const newEntireKeys = Object.keys(req.body);
    const isValid = newEntireKeys.every((keys) =>
      requiredFields.includes(keys)
    );
    if (!isValid) {
      return res.status(400).send({
        status: "Error",
        message: "Fields didn't match",
      });
    }

    Product.updateById(productId, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            status: "error",
            message: "Product not found",
          });
        }
        return res.status(500).send({
          status: "error",
          message: "Error occurred while updating the product",
        });
      }
      return res.status(200).send({
        status: "success",
        data: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * It deletes a product by its id
 * @param req - The request object.
 * @param res - The response object.
 */
const deleteProductById = (req, res) => {
  try {
    const productId = req.params.productId;
    Product.deleteById(productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            status: "error",
            message: "Product not found",
          });
        }
        return res.status(500).send({
          status: "error",
          message: "Error occurred while deleting the product",
        });
      }
      return res.status(200).send({
        status: "success",
        data: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * It deletes all products from the database
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const deleteAllProducts = (req, res) => {
  try {
    Product.removeAll((err, data) => {
      if (err) {
        res.status(500).send({
          status: "error",
          message: "Error occurred while deleting all products",
        });
      }
      res.status(200).send({
        status: "success",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Server error",
    });
  }
};

/**
 * It checks if the keys in the body object are the same as the requiredFields array
 * @param body - The request body
 * @param requiredFields - an array of strings that represent the required fields
 * @returns a boolean value.
 */
const checkFieldValidation = (newEntries, requiredFields) => {
  const isValid =
    requiredFields.every((keys) => newEntries.includes(keys)) &&
    newEntries.every((keys) => requiredFields.includes(keys));
  return isValid;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getCostlyProducts,
  updateProductById,
  deleteProductById,
  deleteAllProducts,
};
