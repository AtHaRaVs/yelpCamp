const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const { campgroundSchema, reviewSchema } = require("./campgroundSchema.js");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const Review = require("./models/review.js");

const campgrounds = require("./routes/camgrounds.js");

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
app.use("/campgrounds", campgrounds);

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.render("home");
});

app.post(
  "/campgrounds/:id/reviews",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = await new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  "/campgrounds/:id/reviews/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
  })
);

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
