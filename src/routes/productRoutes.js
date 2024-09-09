const express = require("express");
const {
  createProductController,
  getProductsByFiltersController,
} = require("../controllers/productController");
const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the database with a unique PLU and name.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plu:
 *                 type: string
 *                 description: The unique product code (PLU).
 *               name:
 *                 type: string
 *                 description: The product name.
 *             example:
 *               plu: "123456"
 *               name: "Product A"
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Bad request, invalid input.
 */

router.post("/products", createProductController);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products by filters
 *     description: Retrieve products by filtering based on PLU or name.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Product name filter
 *       - in: query
 *         name: plu
 *         schema:
 *           type: string
 *         description: Product PLU filter
 *     responses:
 *       200:
 *         description: List of products matching the filters.
 *       400:
 *         description: Invalid query parameters.
 */

router.get("/products", getProductsByFiltersController);

module.exports = router;
