const express = require("express");
const {
  createStockController,
  updateStockController,
  getStockByFiltersController,
} = require("../controllers/stockController");
const router = express.Router();

/**
 * @swagger
 * /stock:
 *   post:
 *     summary: Create stock for a product in a shop
 *     description: Adds an initial stock record for a product in a specific shop.
 *     tags: [Product Stocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The product ID (foreign key to products table).
 *               shop_id:
 *                 type: integer
 *                 description: The shop ID (foreign key to shops table).
 *               quantity_on_shelf:
 *                 type: integer
 *                 description: Quantity of the product available on the shelf.
 *               quantity_in_order:
 *                 type: integer
 *                 description: Quantity of the product currently on order.
 *             example:
 *               product_id: 1
 *               shop_id: 2
 *               quantity_on_shelf: 100
 *               quantity_in_order: 20
 *     responses:
 *       201:
 *         description: Product stock created successfully.
 *       400:
 *         description: Product ID and Shop ID are required.
 */

router.post("/stock", createStockController);

/**
 * @swagger
 * /stock:
 *   put:
 *     summary: Update product stock (increase or decrease)
 *     description: Update the stock of a product in a shop. You can either increase or decrease the stock by specifying a positive or negative quantity.
 *     tags: [Product Stocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product.
 *               shop_id:
 *                 type: integer
 *                 description: The ID of the shop.
 *               amount:
 *                 type: integer
 *                 description: The amount to adjust the stock by.
 *               action:
 *                 type: string
 *                 description: The action type to adjust the stock by.
 *             example:
 *               product_id: 1
 *               shop_id: 2
 *               amount: 5
 *               action: "increase"
 *     responses:
 *       200:
 *         description: Product stock updated successfully.
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Product or shop not found.
 */

router.put("/stock", updateStockController);

/**
 * @swagger
 * /stock:
 *   get:
 *     summary: Get product stocks by filters
 *     description: Retrieve product stock information from different shops based on filters.
 *     tags: [Product Stocks]
 *     parameters:
 *       - in: query
 *         name: plu
 *         schema:
 *           type: string
 *         description: Product PLU code
 *       - in: query
 *         name: shop_id
 *         schema:
 *           type: integer
 *         description: Shop ID to filter stocks
 *       - in: query
 *         name: quantity_on_shelf_min
 *         schema:
 *           type: integer
 *         description: Minimum quantity of stock on the shelf
 *       - in: query
 *         name: quantity_on_shelf_max
 *         schema:
 *           type: integer
 *         description: Maximum quantity of stock on the shelf
 *       - in: query
 *         name: quantity_in_order_min
 *         schema:
 *           type: integer
 *         description: Minimum quantity of stock in order
 *       - in: query
 *         name: quantity_in_order_max
 *         schema:
 *           type: integer
 *         description: Maximum quantity of stock in order
 *     responses:
 *       200:
 *         description: List of product stocks matching the filters.
 *       400:
 *         description: Invalid query parameters.
 */

router.get("/stock", getStockByFiltersController);

module.exports = router;
