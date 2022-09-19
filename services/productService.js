const Product = require("../models/Product");

exports.getProducts = async () => {
  const products = await Product.find({});
  return products;
};
exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};
exports.deleteProductByIdService = async (id) => {
  const product = await Product.deleteOne({ _id: id });
  return product;
};

exports.createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.updateProduct = async (productId, data) => {
  const updatedProduct = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    { runValidators: true }
  );
  return updatedProduct;
  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();
  // return result;
};
exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  const productPromices = [];
  data.products.forEach((product) =>
    productPromices.push(
      Product.updateOne({ _id: product.id }, product.data, {
        runValidators: true,
      })
    )
  );
  const result = Promise.all(productPromices);
  return result;
};
