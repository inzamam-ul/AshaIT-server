const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);
const orderSchema = mongoose.Schema(
  {
    userName: String,
    email: String,
    address: Object,
    date: String,
    orderedProduct: Object,
    paymentId: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
