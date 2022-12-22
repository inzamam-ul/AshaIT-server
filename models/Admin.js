const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);
const adminSchema = mongoose.Schema(
  {
    name: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
