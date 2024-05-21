const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  isLoggedIn,
  validateCampground,
  isAuthor,
} = require("../middleware.js");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  // .post(
  //   isLoggedIn,
  //   validateCampground,
  //   catchAsync(campgrounds.createCampground)
  // );
  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("it worked");
  });

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.get("/:id", catchAsync(campgrounds.showCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
