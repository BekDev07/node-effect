const { pgQuery } = require("../db/dbConnect");

async function createProduct(plu, name) {
  const query = "INSERT INTO products (plu, name) VALUES ($1, $2) RETURNING *";
  const result = await pgQuery(query, [plu, name]);
  return result[0];
}

async function getProductsByFilters(name, plu) {
  const query = "SELECT * FROM products WHERE name ILIKE $1 OR plu = $2";
  const result = await pgQuery(query, [`%${name}%`, plu]);
  return result;
}

module.exports = {
  createProduct,
  getProductsByFilters,
};
