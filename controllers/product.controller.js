const Product = require("../models/Product");
const { getProducts, createProduct } = require("../services/productService");

exports.getProduct = async (req, res, next) => {
  try {
    // const result = await Product.where("name")
    //   .equals(/\w/)
    //   .where("price")
    //   .gt(500)
    //   .where("quantity")
    //   .lt(30)
    //   .limit(5);
    // const result = await Product.find(
    //   {
    //     // $or: [{ price: 10 }, { status: "out-of-stock" }],
    //     price: { $gt: 100 },
    //   },
    //   "name createdAt -_id"
    // ).sort({ createdAt: -1 });

    const result = await getProducts();
    res.status(200).json({
      status: "Successful",
      message: "Product found",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No Product Found",
      error: err.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    // const product = new Product(req.body);
    // if (product.quantity == 0) product.status = "out-of-stock";
    // const result = await product.save();
    const result = await createProduct(req.body);
    result.logger();
    // console.log("result====>", result);
    res.json({
      status: "Successful",
      message: "Product Inserted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Product insertion Failed",
      error: err.message,
    });
  }
};
