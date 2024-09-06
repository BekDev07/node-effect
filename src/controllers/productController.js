const productDao = require("../dao/productDao");
const { StatusCodes } = require("http-status-codes");

const createProductController = async (req, res) => {
  const { plu, name } = req.body;
  if (!name && !plu) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide name or plu",
      status: StatusCodes.BAD_REQUEST,
    });
  }
  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide name",
      status: StatusCodes.BAD_REQUEST,
    });
  }

  if (!plu) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide plu",
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const newProduct = await productDao.createProduct(plu, name);
  res.status(201).json(newProduct);
};
const getProductsByFiltersController = async (req, res) => {
  try {
    const { name, plu } = req.query;

    if (!name && !plu) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Please provide name or plu",
        status: StatusCodes.BAD_REQUEST,
      });
    }

    if (!name && plu) {
      const products = await productDao.getProductsByFilters(plu, "");
      return res.status(StatusCodes.OK).json(products);
    }

    if (!plu && name) {
      const products = await productDao.getProductsByFilters("", name);
      return res.status(StatusCodes.OK).json(products);
    }
    const products = await productDao.getProductsByFilters(plu, name);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

module.exports = { createProductController, getProductsByFiltersController };
