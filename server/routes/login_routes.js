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
  res.send("login route works!");
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



// .......Get user route does the same thing...don't think I need this route.........

// router.get("/refresh", async (req, res) => {
//   console.log('the refresh route is accessed');
//   const token = req?.cookies?.jwt;
//   if (!token) {
//     console.log("NO TOKEN");
//     return res.sendStatus(401);
//   }
//   console.log(token);

//   const foundUser = await User.findOne({ refreshToken: token });
//   console.log("here is the User:");
//   console.log(foundUser);
//   if (!foundUser) return res.sendStatus(403);

//   jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//     if (err || foundUser.username !== decoded.username) return res.sendStatus(403); 
    
//     const accessToken = jwt.sign(
//       { username: decoded.username },
//       process.env.ACCESS_TOKEN_SECRET,
//       {expiresIn: '10s'}
//     )
//     console.log(accessToken);
//     res.json({ accessToken });
//   }); 
// })
