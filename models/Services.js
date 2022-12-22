const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const serviceSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: String,
    imgUrl: String,
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
