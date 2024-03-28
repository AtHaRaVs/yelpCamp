const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("Connection open");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "my backyard",
    description: "cheap camping",
  });
  await camp.save();
  res.send(camp);
});

app.listen("3000", () => {
  console.log("listening on port 3000");
});
