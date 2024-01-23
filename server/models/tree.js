import mongoose from "mongoose";

import { states } from "./utility_schemas.js";

const TreeSchema = new mongoose.Schema({
  title: String,
  imgSrc: [String],
  sciName: String,
  sciInfo: {
    info: String,
    commonNames: String,
    scientificName: String,
    family: String,
    hardinessZones: String,
    origin: String,
  },
  intro: String,
  traits: {
    leafType: {
      type: String,
      enum: ["simple", "compound", "no data"],
    },
    leafShape: {
      type: String,
      enum: [
        "lobed",
        "oval",
        "round",
        "thin",
        "needle",
        "heart",
        "fan",
        "no data",
      ],
    },
    leafSize: [Number],
    bark: String,
    branches: String,
    fruit: {
      type: String,
      enum: [
        "fleshy",
        "berry",
        "nut",
        "acorn",
        "ball",
        "key",
        "cone",
        "catkin",
        "other",
        "no data",
      ],
    },
    flower: {
      type: String,
      enum: [
        "green",
        "yellow",
        "white",
        "red",
        "pink",
        "purple",
        "blue",
        "orange",
        "brown",
        "purplish",
        "greenish",
        "lavender",
        "yellowish",
        "no flower",
        "creamy",
        "no data",
      ],
    },
    location: {
      type: [String],
      enum: states,
    },
  },
  uses: String,
  // adaptation: String,
});

const Tree = mongoose.model('Tree', TreeSchema);

export default Tree