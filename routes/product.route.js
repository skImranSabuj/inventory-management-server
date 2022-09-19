const express = require("express");
const {
  getProduct,
  createProduct,
  updateProduct,
  getProductById,
  bulkUpdateProduct,
  deleteProductById,
} = require("../controllers/product.controller");

const productRoute = express.Router();

productRoute.route("/").get(getProduct).post(createProduct);

productRoute.route("/bulk-update").patch(bulkUpdateProduct);
productRoute
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProductById);


module.exports = productRoute;
