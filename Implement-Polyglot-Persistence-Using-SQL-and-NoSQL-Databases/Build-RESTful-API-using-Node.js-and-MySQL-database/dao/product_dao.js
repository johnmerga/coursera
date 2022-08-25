const db = require("../db/connect");

function Product(product) {
  this.name = product.name;
  this.description = product.description;
  this.price = product.price;
}

/**
 * Create Product Table If Not Exists
 */
Product.createTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS product (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price INT NOT NULL
    )`;
  return db.query(queryText);
};
Product.createTable();

/**
 *
 * Data definition language (DDL)
 */

/* Creating a new product. */
Product.create = (newProduct, result) => {
  const queryText = `INSERT INTO product SET ?`;
  db.query(queryText, newProduct, (err, data) => {
    if (err) {
      result("error occurred while creating the Product", null);
    } else {
      result(null, { id: data.insertId, ...newProduct });
    }
  });
};

/* A function that takes in a productId and a result. It then queries the database for the product with
the given productId. If there is an error, it logs the error and returns null. If there is no error,
it checks if the data length is 0. If it is, it returns an object with a kind of not_found and null.
If the data length is not 0, it returns null and the data. */
Product.findById = (productId, result) => {
  const queryText = `SELECT * FROM product WHERE ID=?`;
  db.query(queryText, productId, (err, data) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (data.length == 0) return result({ kind: "not_found" }, null);

      result(null, data[0]);
    }
  });
};

/* A function that takes in a parameter and a result. It then queries the database for all products. If
there is an error, it logs the error and returns null. If there is no error, it checks if the data
length is 0. If it is, it returns an object with a kind of not_found and null. If the data length is
not 0, it returns null and the data. */
Product.getAll = (parameter, result) => {
  let queryText = `SELECT * FROM product`;
  if (parameter) {
    queryText += ` WHERE name LIKE '%${parameter}%'`;
  }
  db.query(queryText, (err, data) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (data.length == 0) return result({ kind: "not_found" }, null);
      result(null, data);
    }
  });
};

/* A function that takes in a price and a result. It then queries the database for all products with a
price greater than the given price. If there is an error, it logs the error and returns null. If
there is no error, it checks if the data length is 0. If it is, it returns an object with a kind of
not_found and null. If the data length is not 0, it returns null and the data. */
Product.getCostlyProducts = (price, result) => {
  const queryText = `SELECT * FROM product WHERE price > ?`;
  db.query(queryText, price, (err, data) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (data.length == 0) return result({ kind: "not_found" }, null);
      result(null, data);
    }
  });
};

/* Updating the product with the given productId. */
Product.updateById = (productId, product, result) => {
  const queryText = `UPDATE product SET ? WHERE id=?`;
  delete product.id;
  db.query(queryText, [product, productId], (err, data) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (data.affectedRows == 0) return result({ kind: "not_found" }, null);
      Product.findById(productId, (err, data) => {
        if (err) {
          return result(err, null);
        } else {
          return result(null, data);
        }
      });
    }
  });
};

/* Deleting a product by id. */
Product.deleteById = (productId, result) => {
  const queryText = `DELETE FROM product WHERE id=?`;
  db.query(queryText, productId, (err, data) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (data.affectedRows == 0) return result({ kind: "not_found" }, null);
      result(null, { id: productId });
    }
  });
};

/* Deleting all the rows in the product table. */
Product.removeAll = (result) => {
  const queryText = `DELETE FROM product`;
  db.query(queryText, (err, data) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (data.affectedRows == 0) return result({ kind: "not_found" }, null);
      result(null, { id: productId });
    }
  });
};

module.exports = Product;

// Product.updateById(5, { name: "Apple", description: "Red" }, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// Product.getCostlyProducts('101', (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   });

// Product.getAll("", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// Product.findById(12, (err, result) => {
//   if (err) {
//     console.log("error: ", err);
//   } else {
//     console.log(result);
//   }
// });

// const prod1 = {
//   name: "Product 1",
//   description: "This is product 1",
//   price: 100,
// };
// Product.create(prod1, (err, result) => {
//   if (err) {
//     console.log("error: ", err);
//   } else {
//     console.log(result);
//   }
// });
