const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
const {
  getProduct,
  createProduct,
} = require("./controllers/product.controller");
const productRoute = require("./routes/product.route");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("API HITTED!!");
  res.send("Route is working! YaY!");
});

app.use("/api/v1/product", productRoute);


module.exports = app;
