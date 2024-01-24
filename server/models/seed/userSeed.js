import mongoose from "mongoose";

import User from "../user.js";

const userSeedData = {
  username: "admin",
  email: "njhaus@gmail.com",
  collections: ["My house"],
  saved: [
    {
      tree: "6555251c3391eee4e6452ca5",
      collection: ["My house"],
    },
    {
      tree: "6555251c3391eee4e6452ca4",
      collection: ["My house"],
    },
    {
      tree: "6555251c3391eee4e6452ca3",
      collection: [],
    },
    {
      tree: "6555251c3391eee4e6452ca2",
      collection: [],
    },
  ],
  found: [
    {
      tree: "6555251c3391eee4e6452ca5",
      location: [
        {
          type: "point",
          coordinates: [-74.360846, 40.45940210000001],
        },
      ],
    },
    {
      tree: "6555251c3391eee4e6452ca5",
      location: [
        {
          type: "point",
          coordinates: [-72.360846, 41.45940210000001],
        },
      ],
    },
  ],
  favorites: [
    {
      tree: "6555251c3391eee4e6452ca5",
      notes: "Love it!",
    },
    {
      tree: "6555251c3391eee4e6452ca4",
      notes: "I hve this tree in my backyard.",
    },
    {
      tree: "6555251c3391eee4e6452ca2",
      notes: "amazizing.",
    },
  ],
};

// Mongoose Setup

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/treesDB");
    console.log("Mongoose Connection successful");
  } catch (err) {
    console.error(err);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();

// Seed function

async function seedTreeDb(data) {
  const userSeed = data;
  try {
    const seeded = await User.insertMany(userSeed);
    if (seeded) console.log(seeded);
  } catch (err) {
    console.log(err);
  }
}
seedTreeDb(userSeedData);
