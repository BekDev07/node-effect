const express = require("express");
const {
  createProductController,
  getProductsByFiltersController,
} = require("../controllers/productController");
const router = express.Router();

router.post("/products", createProductController);
router.get("/products", getProductsByFiltersController);

module.exports = router;
