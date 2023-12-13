import mongoose from "mongoose";

import { tempTreeData } from "./treesSeedData.js";

// Mongoose Setup

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/treesDB");
    console.log("Mongoose Connection successful");
  } catch (err) {
    console.err(err);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();


// Seed function

import Tree from "../tree.js";

async function seedTreeDb(data) {
  const treeSeed = data;
  console.log(treeSeed);
    try {
        const seeded = await Tree.insertMany(treeSeed);
        if(seeded) console.log(seeded);
    } catch (err) {
        console.log(err);
    }
} 
seedTreeDb(tempTreeData);