//Import the necessary dependencies
const http = require("http");
// Define a prot at which the server will run
const PORT = process.env.PORT || 3000;

const {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct,
} = require("./productsService");
const { getRequestData, writeHead } = require("./utils");

const server = http.createServer(async (req, res) => {
  // Get all products
  if (req.url === "/api/v1/products" && req.method === "GET") {
    try {
      const products = getProducts();
      if (!products || products.length === 0) {
        writeHead(res, 404);
        res.end();
      }
      writeHead(res, 200);
      res.end(products);
    } catch (error) {
      writeHead(res, 500);
      res.end(error.message);
    }
  }
  // Get a product with specified id
  else if (
    req.url.match(/^\/api\/v1\/products\/([a-zA-Z0-9]+)$/) &&
    req.method === "GET"
  ) {
    // Get a product by ID
    try {
      const id = req.url.split("/")[4];
      getProductsById(id, (err, data) => {
        if (err) {
          writeHead(res, 400);
          res.end(err);
        }
        writeHead(res, 200);
        res.end(data);
      });
    } catch (error) {
      writeHead(res, 500);
      res.end(error.message);
    }
  }
  // Create a new product
  else if (req.url === "/api/v1/products" && req.method === "POST") {
    try {
      const body = await getRequestData(req);
      saveProduct(body, (err, data) => {
        if (err) {
          writeHead(res, 400);
          res.end(err);
        }
        writeHead(res, 201);
        res.end(data);
      });
    } catch (error) {
      writeHead(res, 500);
      res.end(error.message);
    }
  }
  // Update a specific product
  else if (
    req.url.match(/^\/api\/v1\/products\/([a-zA-Z0-9]+)$/) &&
    req.method === "PUT"
  ) {
    try {
      const id = req.url.split("/")[4];
      const body = await getRequestData(req);
      updateProduct(id, body, (err, data) => {
        if (err) {
          writeHead(res, 400);
          res.end(err);
        }
        writeHead(res, 200);
        res.end(data);
      });
    } catch (error) {
      writeHead(res, 500);
      res.end(error.message);
    }
  } // Delete a specific Product
  else if (
    req.url.match(/^\/api\/v1\/products\/([a-zA-Z0-9]+)$/) &&
    req.method === "DELETE"
  ) {
    try {
      const id = req.url.split("/")[4];
      deleteProduct(id, (err, data) => {
        if (err) {
          writeHead(res, 400);
          res.end(err);
        }
        writeHead(res, 200);
        res.end(data);
      });
    } catch (error) {
      writeHead(res, 500);
      res.end(error.message);
    }
  }
  // else request not supported
  else {
    writeHead(res, 404);
    res.end();
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
