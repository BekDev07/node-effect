const { pgQuery } = require("../db/dbConnect");

async function createProduct(plu, name) {
  const query = "INSERT INTO products (plu, name) VALUES ($1, $2) RETURNING *";
  const result = await pgQuery(query, [plu, name]);
  return result[0];
}

async function getProductsByFilters(plu, name) {
  console.log("plu and name", plu, name);

  const query = "SELECT * FROM products WHERE name ILIKE $1 OR plu = $2";
  const result = await pgQuery(query, [`%${name}%`, plu]);
  console.log(result);

  return result;
}

module.exports = {
  createProduct,
  getProductsByFilters,
};
