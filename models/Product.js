const Mongoose = require("mongoose");

const productSchedma = Mongoose.Schema(
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
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    catagories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: Mongoose.Schema.Types.ObjectId,
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

const Product = Mongoose.model("Product", productSchedma);

module.exports = Product;
