import { Router } from "express";

import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

const router = Router();


// Get env variables
router.get('/maptilerkey', async (req, res, next) => {
    const key = process.env.MAPTILER_KEY;
    res.send(key);
})

router.get("/radarKey", async (req, res, next) => {
  const key = process.env.RADAR_KEY;
  res.send(key);
});




export default router;