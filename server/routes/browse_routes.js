import { Router } from "express";

import Tree from "../models/tree.js";

const router = Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  // Set up filter object
  const filters = {
    title: '',
    leafType: undefined,
    leafShape: undefined,
    leafSize: undefined,
    bark: undefined,
    fruit: undefined,
    flower: undefined,
    location: []
  };

  // Lowercase all values and add to filters
  for (let filter in req.body) {
    const val = req.body[filter]
    if (typeof val === 'string' && filter !== 'location') {
      filters[filter] = val.toLowerCase();
    } else if (Array.isArray(filter)) {
      filters[filter] = val.map((item) => (typeof item === 'string' ? item.toLowerCase() : item));
    }
    else {
      filters[filter] = val;
    }
  }



  console.log("FILTERS");
  console.log(filters);
  
  // Construct query object
  const query = {
    title: { $regex: filters.title, $options: "i" },
    "traits.leafType": filters.leafType ? filters.leafType : undefined,
    "traits.leafShape": filters.leafShape ? filters.leafShape : undefined,
    "traits.leafSize": filters.leafSize ? filters.leafSize : undefined,
    "traits.bark": filters.bark ? filters.bark : undefined,
    "traits.fruit": filters.fruit ? filters.fruit : undefined,
    "traits.flower": filters.flower ? filters.flower : undefined,
    "traits.location": filters.location ? { $all: filters.location } : undefined,
  };


  console.log("QUERy Object");
  console.log(query);

  // Get rid of nonexistant queries
  const existingQueries = Object.keys(query).reduce((result, key) => {
    if (query[key]) {
      result[key] = query[key];
    }
    return result;
  }, {}); 

  console.log("QUERIES")
  console.log(existingQueries)
  // Find trees that match criteria
  const foundTrees = await Tree.find(
    existingQueries
  );

  // console.log(foundTrees);
  res.send(foundTrees);
});

export default router;
