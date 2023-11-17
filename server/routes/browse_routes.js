import { Router } from "express";

import Tree from "../models/tree.js";

const router = Router();

router.post("/", async (req, res) => {
  // Set up filter object
  const filters = {
    title: '',
    leafType: undefined,
    leafShape: undefined,
    leafSize: undefined,
    bark: [],
    fruit: undefined,
    flower: undefined,
    location: []
  };

  // Lowercase all values and add to filters
  for (let f in req.body) {
    const val = req.body[f]
    if (typeof val === 'string') {
      filters[f] = val.toLowerCase();
    } else if (Array.isArray(f)) {
      filters[f] = val.map((item) => (typeof item === 'string' ? item.toLowerCase() : item));
    }
  }

  
  // Construct query object
  const query = {
    title: { $regex: filters.title, $options: "i" },
    "traits.leafType": filters.leafType ? filters.leafType : undefined,
    "traits.leafShape": filters.leafShape ? filters.leafShape : undefined,
    "traits.leafSize": filters.leafSize ? filters.leafSize : undefined,
    "traits.bark": filters.bark.length > 0 ? { $all: [...filters.bark] } : undefined,
    "traits.fruit": filters.fruit ? filters.fruit : undefined,
    "traits.flower": filters.flower ? filters.flower : undefined,
    "traits.location": filters.location.length > 0 ? { $all: [...filters.location] } : undefined,
  };

  // Get rid of nonexistant queries
  const existingQueries = Object.keys(query).reduce((result, key) => {
    if (query[key]) {
      result[key] = query[key];
    }
    return result;
  }, {}); 

  // Find trees that match criteria
  const foundTrees = await Tree.find(
    existingQueries
  );

  console.log(foundTrees);
  res.send(foundTrees);
});

export default router;
