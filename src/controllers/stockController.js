const stockDao = require("../dao/stockDao");
const { logAction } = require("../utils/integrate");

const createStockController = async (req, res) => {
  const { product_id, shop_id, quantity_on_shelf, quantity_in_order } =
    req.body;

  try {
    if (!product_id || !shop_id) {
      return res
        .status(400)
        .json({ error: "Product ID and Shop ID are required" });
    }

    const newStock = await stockDao.createStock({
      product_id,
      shop_id,
      quantity_on_shelf,
      quantity_in_order,
    });

    await logAction(
      product_id,
      shop_id,
      "create_stock",
      "Stock created successfully"
    );

    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ error: "Error creating stock" });
  }
};

const updateStockController = async (req, res) => {
  const { product_id, shop_id, amount, action } = req.body; // action: 'increase' or 'decrease'

  try {
    if (!product_id || !shop_id || !amount || !action) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    let updatedStock;

    if (action === "increase") {
      updatedStock = await stockDao.updateStock(
        product_id,
        shop_id,
        amount,
        "increase"
      );
    } else if (action === "decrease") {
      updatedStock = await stockDao.updateStock(
        product_id,
        shop_id,
        amount,
        "decrease"
      );
    } else {
      return res.status(400).json({ error: "Invalid action specified" });
    }
    const logging = await logAction(
      product_id,
      shop_id,
      "update_stock",
      "Stock updated successfully"
    );
    console.log(logging);

    res.status(200).json(updatedStock);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error updating stock" });
  }
};

const getStockByFiltersController = async (req, res) => {
  const {
    plu,
    shop_id,
    quantity_on_shelf_min,
    quantity_on_shelf_max,
    quantity_in_order_min,
    quantity_in_order_max,
  } = req.query;

  try {
    const filters = {};

    if (plu) {
      filters.plu = plu;
    }
    if (shop_id) {
      filters.shop_id = shop_id;
    }
    if (quantity_on_shelf_min) {
      filters.quantity_on_shelf_min = quantity_on_shelf_min;
    }
    if (quantity_on_shelf_max) {
      filters.quantity_on_shelf_max = quantity_on_shelf_max;
    }
    if (quantity_in_order_min) {
      filters.quantity_in_order_min = quantity_in_order_min;
    }
    if (quantity_in_order_max) {
      filters.quantity_in_order_max = quantity_in_order_max;
    }

    const stocks = await stockDao.getStockByFilters(filters);

    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stock data" });
  }
};

module.exports = {
  createStockController,
  updateStockController,
  getStockByFiltersController,
};
