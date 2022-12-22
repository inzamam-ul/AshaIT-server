const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);

const reviewSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    picture: String,
    review: String,
    photo: String,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
