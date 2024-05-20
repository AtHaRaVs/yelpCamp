const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("Connection open");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "664ad9671256a50a6cb210b9",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/11649432",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, maiores enim,omnis ipsum exercitationem laudantium possimus quod distinctio atque, repellat perspiciatis veritatis nulla totam eius odio. Praesentium quasi recusandae corporis!",
      price,
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
