const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// const DBConnect = require("./utils/dbConnect");

const app = require("./app");

// database connection
// DBConnect();
mongoose
  .connect("mongodb://localhost:27017/acc-inventory")
  .then((res) => {
    console.log("server connected".green.bold);
  })
  .catch((err) => console.log("err"));
// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

