const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5050;

const uri = `mongodb+srv://chaldaluser:chaldaluser420@cluster0.gbf8e.mongodb.net/AshaIT?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  console.log(err);
  const serviceCollection = client.db("AshaIT").collection("services");
  const orderCollection = client.db("AshaIT").collection("orders");
  const adminCollection = client.db("AshaIT").collection("admins");
  const reviewCollection = client.db("AshaIT").collection("reviews");

  app.post("/addAdmin", (req, res) => {
    const newAdmin = req.body;
    adminCollection.insertOne(newAdmin).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.post("/addReview", (req, res) => {
    const newReview = req.body;
    console.log(newReview);
    reviewCollection.insertOne(newReview).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.post("/addService", (req, res) => {
    const newService = req.body;
    serviceCollection.insertOne(newService).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/reviews", (req, res) => {
    reviewCollection.find({}).toArray((err, service) => {
      res.send(service);
    });
  });
  app.get("/services", (req, res) => {
    serviceCollection.find({}).toArray((err, service) => {
      console.log(service);
      if (err == null) {
        res.send(service);
      } else {
        res.send(err);
      }
    });
  });

  app.get("/singleService/:id", (req, res) => {
    serviceCollection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, docs) => {
        res.send(docs[0]);
      });
  });

  app.patch("/updateService/:id", (req, res) => {
    serviceCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            name: req.body.name,
            price: req.body.price,
          },
        }
      )
      .then((result) => {
        res.send(result.modifiedCount > 0);
      });
  });
  app.patch("/updateOrderStatus/:id", (req, res) => {
    orderCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            status: req.body.status,
          },
        }
      )
      .then((result) => {
        res.send(result.modifiedCount > 0);
      });
  });

  //Delete data
  app.delete("/deleteService/:id", (req, res) => {
    serviceCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      });
  });

  app.post("/placeOrder", (req, res) => {
    console.log(req.body);
    const newOrder = req.body;
    orderCollection.insertOne(newOrder).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/allOrder", (req, res) => {
    orderCollection.find({}).toArray((err, docs) => {
      res.send(docs);
    });
  });

  app.get("/isAdmin/:email", (req, res) => {
    adminCollection.find({ email: req.params.email }).toArray((err, docs) => {
      res.send(docs.length > 0);
      console.log(docs);
    });
  });
  app.get("/allOrder/:email", (req, res) => {
    console.log(req.params.email);
    orderCollection.find({ email: req.params.email }).toArray((err, docs) => {
      res.send(docs);
    });
  });
});

app.get("/", (req, res) => {
  res.send("Asha IT Server Is Working!");
});

app.listen(port, () => {
  console.log(`${port}`);
});
