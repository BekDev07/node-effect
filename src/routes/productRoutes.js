const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/products", productController.createProduct);
router.get("/products", productController.getProductsByFilters);

module.exports = router;
