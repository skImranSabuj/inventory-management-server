const Product = require("../models/Product");

exports.getProducts = async () => {
  const products = await Product.find({});
  return products;
};

exports.createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};
