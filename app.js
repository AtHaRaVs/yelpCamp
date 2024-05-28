if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// imports

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStratergy = require("passport-local");
const User = require("./models/user.js");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// routes
const userRoutes = require("./routes/users.js");
const campgroundRoutes = require("./routes/camgrounds.js");
const reviewRoutes = require("./routes/reviews.js");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("MongoDB Connection open 🔥");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
main();

const sessionConfig = {
  name: "session",
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //secure: true,
    expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(mongoSanitize());
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net/",
  "https://res.cloudinary.com/global-managerzz/",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net/",
  "https://res.cloudinary.com/global-managerzz/",
];
const connectSrcUrls = [
  "https://*.tiles.mapbox.com",
  "https://api.mapbox.com",
  "https://events.mapbox.com",
  "https://res.cloudinary.com/global-managerzz/",
];
const fontSrcUrls = ["https://res.cloudinary.com/global-managerzz/"];

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", "blob:"],
        objectSrc: [],
        imgSrc: [
          "'self'",
          "blob:",
          "data:",
          "https://res.cloudinary.com/global-managerzz/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
          "https://images.unsplash.com/",
        ],
        fontSrc: ["'self'", ...fontSrcUrls],
        mediaSrc: ["https://res.cloudinary.com/dlzez5yga/"],
        childSrc: ["blob:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // how to store in session
passport.deserializeUser(User.deserializeUser()); // how to unstore it in session

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

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
