const router = require("express").Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  getCostlyProducts,
  updateProductById,
  deleteProductById,
  deleteAllProducts,
} = require("../controllers/product_controller");

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/price/", getCostlyProducts);
router.get("/:productId", getProductById);
router.put("/:productId", updateProductById);
router.delete("/:productId", deleteProductById);
router.delete("/", deleteAllProducts);

module.exports = router;
