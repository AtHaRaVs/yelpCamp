// imports
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

// routes
const campgrounds = require("./routes/camgrounds.js");
const reviews = require("./routes/reviews.js");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("MongoDB Connection open 🔥");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
main();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen("3000", () => {
  console.log("listening on port 3000 ✨");
});
