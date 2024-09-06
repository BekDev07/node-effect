const productDao = require("../dao/productDao");

const productController = {
  createProduct: async (req, res) => {
    try {
      const { plu, name } = req.body;
      const newProduct = await productDao.createProduct(plu, name);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error creating product" });
    }
  },

  getProductsByFilters: async (req, res) => {
    try {
      const { name, plu } = req.query;
      const products = await productDao.getProductsByFilters(name, plu);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
    }
  },
};

module.exports = productController;
