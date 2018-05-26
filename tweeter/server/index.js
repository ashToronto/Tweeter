"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// EJS ENGINE ADDED
app.set("view engine", "ejs")

// The in-memory database of tweets. It's a basic object with an array in it.
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  };

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

// Registration Feature Get Page
app.get("/register", (req, res) => {
  res.render("register");
});

//Post Registration
app.post("/register", (req, res) => {
 var newUser = {
  email: req.body.email,
  password: req.body.password
 };
 db.collection("users").insertOne(newUser);
});

// Get request Login Feature Page
app.get("/login", (req, res) => {
  var newUser = {
  email: req.body.email,
  password: req.body.password
 };
  res.render("login");
});

//Login Feature with mongo authenticate
app.post("/login", (req, res) => {
   var newUser = {
    email: req.body.email,
    password: req.body.password
   };
    var search = db.collection("users").findOne({'email': newUser.email}, {'password': newUser.password})
    .then(function(doc) {
      console.log(doc)
      if (doc !== null){
        return res.redirect("http://localhost:8080/")
      } else {
        return res.status(401).send("Error! Incorrect Login")
      }
    });
});

// Activate
app.listen(PORT, () => {
  console.log("Tweeter app listening on port " + PORT);
});
});

// Test with: mongo >> show dbs >> use 'tweeter' >> db.users >> db.users.find()
// where 'users' = [bject]
// where tweeter = 'dbs files on local'
