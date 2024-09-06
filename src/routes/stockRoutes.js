const express = require("express");
const stockController = require("../controllers/stockController");
const router = express.Router();

router.post("/stock", stockController.createStock);
router.put("/stock", stockController.updateStock);
router.get("/stock", stockController.getStockByFilters);

module.exports = router;
