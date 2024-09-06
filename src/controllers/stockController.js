const stockDao = require("../dao/stockDao");

const stockController = {
  createStock: async (req, res) => {
    try {
      const { product_id, shop_id, quantity_on_shelf, quantity_in_order } =
        req.body;
      const newStock = await stockDao.createStock(
        product_id,
        shop_id,
        quantity_on_shelf,
        quantity_in_order
      );
      res.status(201).json(newStock);
    } catch (error) {
      res.status(500).json({ error: "Error creating stock" });
    }
  },

  updateStock: async (req, res) => {
    try {
      const { product_id, shop_id, quantity_on_shelf, quantity_in_order } =
        req.body;
      const updatedStock = await stockDao.updateStock(
        product_id,
        shop_id,
        quantity_on_shelf,
        quantity_in_order
      );
      res.status(200).json(updatedStock);
    } catch (error) {
      res.status(500).json({ error: "Error updating stock" });
    }
  },

  getStockByFilters: async (req, res) => {
    try {
      const { plu, shop_id, min_quantity, max_quantity } = req.query;
      const stock = await stockDao.getStockByFilters(
        plu,
        shop_id,
        min_quantity,
        max_quantity
      );
      res.status(200).json(stock);
    } catch (error) {
      res.status(500).json({ error: "Error fetching stock" });
    }
  },
};

module.exports = stockController;
