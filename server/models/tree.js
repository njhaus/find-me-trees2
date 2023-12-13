import mongoose from "mongoose";

import { states } from "./utility_schemas.js";

const TreeSchema = new mongoose.Schema({
  title: String,
  imgSrc: [String],
  sciName: String,
  sciInfo: {
    info: String,
  },
  intro: String,
  traits: {
    leafType: {
      type: String,
      enum: ["simple", "compound"],
    },
    leafShape: {
      type: String,
      enum: ["needle", "smooth", "toothed", "lobed"],
    },
    leafSize: Number,
    bark: String,
    branches: String,
      fruit: {
          type: String,
          enum: ["fleshy",
      "berry",
      "nut",
      "acorn",
      "ball",
      "key",
      "cone",
      "catkin",
      "other"]
    },
    flower: {
        type: String,
        enum: ["red",
      "pink",
      "purple",
      "blue",
      "orange",
      "yellow",
      "white",
      "green",
      "other"]
    },
    location: {
      type: [String],
      enum: states,
    },
  },
});

const Tree = mongoose.model('Tree', TreeSchema);

export default Tree