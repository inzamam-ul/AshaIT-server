const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Admin = require("./models/Admin");
const Review = require("./models/Review");
const Service = require("./models/Services");
const Order = require("./models/Order");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5050;

const uri = `mongodb+srv://chaldaluser:chaldaluser420@cluster0.gbf8e.mongodb.net/AshaIT?retryWrites=true&w=majority`;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connection successful!");
  } catch (error) {
    console.log(error);
  }
};

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("database connection successful!"))
//   .catch((err) => console.log(err));

app.post("/addAdmin", async (req, res) => {
  // {"name":"Haque Md Inzamamul","email":"inzamam.cu@gmail.com"}

  try {
    const newAdmin = new Admin({ ...req.body });
    const data = await newAdmin.save();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});
app.post("/addReview", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const data = await newReview.save();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});
app.post("/addService", async (req, res) => {
  try {
    const newService = new Service(req.body);
    const data = await newService.save();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const data = await Review.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/services", async (req, res) => {
  try {
    const data = await Service.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/singleService/:id", async (req, res) => {
  try {
    const data = await Service.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.patch("/updateService/:id", async (req, res) => {
  try {
    const data = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});
app.patch("/updateOrderStatus/:id", async (req, res) => {
  try {
    const data = await Order.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

//Delete data
app.delete("/deleteService/:id", async (req, res) => {
  try {
    const data = await Service.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/placeOrder", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const data = await newOrder.save();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/allOrder", async (req, res) => {
  try {
    const data = await Order.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/isAdmin/:email", async (req, res) => {
  try {
    const data = await Admin.find({ email: req.params.email });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});
app.get("/allOrder/:email", async (req, res) => {
  try {
    const data = await Order.find({ email: req.params.email });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("Asha IT Server Is Working!");
});

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on post: ${port}`);
  });
});
