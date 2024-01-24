import { Router } from "express";
import User from "../models/user.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

import * as loginCntrl from './controllers/login_routes_cntrl.js'
import { validateNewUser } from "../middleware/joi_middleware.js";

const router = Router();

router.get("/", (req, res, next) => {
  res.send({code: '200', message: "login route works!"});
});


// Register user 
router.post("/register/local", validateNewUser, loginCntrl.registerNewUser);


// Log in user
router.post(
  '/local',
  passport.authenticate("local", {
  failureMessage: true
  }),
  loginCntrl.loginLocal
)


// Log out
router.post("/logout", loginCntrl.logout);


// Refresh token or check token and send user data
router.get("/getuser", loginCntrl.handleToken);


// Used for testing
router.get('/test', async (req, res, next) => {
  const foundUser = await User.findOne({ username: 'njhaus' })
    .populate('saved._id')
    .populate('found._id')
    .populate('favorites._id');
  console.log(foundUser);
  res.send(foundUser);
})


export default router;

