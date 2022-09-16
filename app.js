const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");

app.use(express.json());
app.use(cors());

const productSchedma = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be 3 or lettes long"],
      maxLength: [100, "Name can't be more than 100 letters"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negetive"],
    },
    unit: {
      type: String,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negetive"],
      valoidate: {
        validator: (val) => {
          const isInteger = Number.isInteger(val);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Quantity must be integer",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "invalid status",
      },
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    catagories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timeStamps: true,
  }
);

productSchedma.pre("save", function (next) {
  console.log("PRE MIDDELWARE", this.quantity);
  if (this.quantity == 0) this.status = "out-of-stock";
  next();
});
productSchedma.post("save", function (doc, next) {
  console.log("POST MIDDELWARE", doc);
  // if (this.quantity == 0) this.status = "out-of-stock";
  next();
});

productSchedma.methods.logger = function () {
  const message = {
    status: "SAVED",
    product: this.name,
  };
  console.log(message);
};

const Product = mongoose.model("Product", productSchedma);

app.get("/", (req, res) => {
  console.log("API HITTED!!");
  res.send("Route is working! YaY!");
});

app.post("/api/v1/product", async (req, res, next) => {
  try {
    console.log(req.body);
    // const product = new Product(req.body);
    // if (product.quantity == 0) product.status = "out-of-stock";
    // const result = await product.save();
    const result = await Product.create(req.body);
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
});

app.get("/api/v1/product", async (req, res, next) => {
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

    const result = await Product.find({ _id: "6324a970a4aa1517d4ea10a4" });
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
});


module.exports = app;
