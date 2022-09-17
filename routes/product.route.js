const express = require("express");
const {
  getProduct,
  createProduct,
} = require("../controllers/product.controller");
const productRoute = express.Router();

productRoute.route("/").get(getProduct).post(createProduct);
module.exports = productRoute;
