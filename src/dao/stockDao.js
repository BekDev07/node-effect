const { pgQuery } = require("../db/dbConnect");

async function createStock(
  product_id,
  shop_id,
  quantity_on_shelf,
  quantity_in_order
) {
  const query =
    "INSERT INTO stock (product_id, shop_id, quantity_on_shelf, quantity_in_order) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pgQuery(query, [
    product_id,
    shop_id,
    quantity_on_shelf,
    quantity_in_order,
  ]);
  return result[0];
}

async function updateStock(
  product_id,
  shop_id,
  quantity_on_shelf,
  quantity_in_order
) {
  const query =
    "UPDATE stock SET quantity_on_shelf = $1, quantity_in_order = $2 WHERE product_id = $3 AND shop_id = $4 RETURNING *";
  const result = await pgQuery(query, [
    quantity_on_shelf,
    quantity_in_order,
    product_id,
    shop_id,
  ]);
  return result[0];
}

async function getStockByFilters(plu, shop_id, min_quantity, max_quantity) {
  const query = `
    SELECT stock.* FROM stock
    INNER JOIN products ON stock.product_id = products.id
    WHERE products.plu = $1 AND stock.shop_id = $2 AND stock.quantity_on_shelf BETWEEN $3 AND $4
  `;
  const result = await pgQuery(query, [
    plu,
    shop_id,
    min_quantity,
    max_quantity,
  ]);
  return result;
}

module.exports = {
  createStock,
  updateStock,
  getStockByFilters,
};
