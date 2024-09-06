const { pgQuery } = require("../db/dbConnect");

const createStock = async ({
  product_id,
  shop_id,
  quantity_on_shelf,
  quantity_in_order,
}) => {
  try {
    const query = `
      INSERT INTO stock (product_id, shop_id, quantity_on_shelf, quantity_in_order)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const queryParams = [
      product_id,
      shop_id,
      quantity_on_shelf,
      quantity_in_order,
    ];

    const result = await pgQuery(query, queryParams);

    if (result.length === 0) {
      throw new Error("Failed to create stock");
    }

    return result[0];
  } catch (error) {
    throw new Error(`Error creating stock: ${error.message}`);
  }
};

const updateStock = async (product_id, shop_id, amount, action) => {
  try {
    let query;
    const queryParams = [amount, product_id, shop_id];

    if (action === "increase") {
      query = `
        UPDATE stock
        SET quantity_on_shelf = quantity_on_shelf + $1
        WHERE product_id = $2 AND shop_id = $3
        RETURNING *`;
    } else if (action === "decrease") {
      query = `
        UPDATE stock
        SET quantity_on_shelf = quantity_on_shelf - $1
        WHERE product_id = $2 AND shop_id = $3
        RETURNING *`;
    } else {
      throw new Error("Invalid action");
    }

    const result = await pgQuery(query, queryParams);

    if (result.length === 0) {
      throw new Error("Stock not found for the specified product and shop");
    }

    return result[0];
  } catch (error) {
    throw new Error(`Error updating stock quantity: ${error.message}`);
  }
};

const getStockByFilters = async (filters) => {
  try {
    let query = `
      SELECT 
        s.shop_id, 
        sh.name AS shop_name, 
        p.plu, 
        p.name AS product_name, 
        s.quantity_on_shelf, 
        s.quantity_in_order
      FROM stock s
      JOIN products p ON s.product_id = p.id
      JOIN shops sh ON s.shop_id = sh.id
      WHERE 1=1`;

    const queryParams = [];

    if (filters.plu) {
      query += ` AND p.plu = $${queryParams.length + 1}`;
      queryParams.push(filters.plu);
    }
    if (filters.shop_id) {
      query += ` AND s.shop_id = $${queryParams.length + 1}`;
      queryParams.push(filters.shop_id);
    }
    if (filters.quantity_on_shelf_min) {
      query += ` AND s.quantity_on_shelf >= $${queryParams.length + 1}`;
      queryParams.push(filters.quantity_on_shelf_min);
    }
    if (filters.quantity_on_shelf_max) {
      query += ` AND s.quantity_on_shelf <= $${queryParams.length + 1}`;
      queryParams.push(filters.quantity_on_shelf_max);
    }
    if (filters.quantity_in_order_min) {
      query += ` AND s.quantity_in_order >= $${queryParams.length + 1}`;
      queryParams.push(filters.quantity_in_order_min);
    }
    if (filters.quantity_in_order_max) {
      query += ` AND s.quantity_in_order <= $${queryParams.length + 1}`;
      queryParams.push(filters.quantity_in_order_max);
    }

    const result = await pgQuery(query, queryParams);

    return result;
  } catch (error) {
    throw new Error(`Error fetching stock by filters: ${error.message}`);
  }
};

module.exports = {
  createStock,
  updateStock,
  getStockByFilters,
};
