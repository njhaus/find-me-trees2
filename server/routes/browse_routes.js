import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  res.send("browse route works!");
});

export default router;
