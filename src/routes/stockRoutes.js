const express = require("express");
const {
  createStockController,
  updateStockController,
  getStockByFiltersController,
} = require("../controllers/stockController");
const router = express.Router();

router.post("/stock", createStockController);
router.put("/stock", updateStockController);
router.get("/stock", getStockByFiltersController);

module.exports = router;
