import { Router } from "express";
import User from "../models/user.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

const router = Router();

router.get("/", (req, res, next) => {
  res.send("login route works!");
});

// Register user 
// -need to add flash messages or other feedback mechanism for failed / successful registration
// -Need to connect to JOI User schema validation
router.post('/register/local', async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUsername = await User.findOne({ username: username });
  const existingUserEmail = await User.findOne({ email: email });
  if (!existingUsername && !existingUserEmail) {
    try {
      const newUser = new User({ username: username, email: email });
      const registeredUser = await User.register(newUser, password);
      await req.login(registeredUser, function (err) {
        if (err) {
          console.log('error logging in')
          return res.send('error logging in.');
        }
        else {
          console.log("user registered and logged in!");
          const accessToken = jwt.sign({
            username: registeredUser.username,
          }, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '60'}
          );
          const refreshToken = jwt.sign(
            {
              username: registeredUser.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          User.findOneAndUpdate({ username: registeredUser.username }, { refreshToken: refreshToken })
          res.cookie('jwt', {httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})
          return res.json({
            username: registeredUser.username,
            email: registeredUser.email,
            collections: registeredUser.collections,
            saved: registeredUser.saved,
            found: registeredUser.found,
            favorites: registeredUser.favorites,
            accessToken: accessToken,
          });
        }
        })   
    } catch (err) {
      let errMsg = "Error accessing database. Please try again later.";
      console.log(errMsg);
    }
  }
  else if (existingUsername) {
    res.send({error: 'A user with that username already exists'});
  }
  else if (existingUserEmail) {
    res.send({error: "A user with that email already exists"});
  }
  else {
    res.send({error: "An error occurred while making your request."});
  }
})

// Log in user
router.post(
  '/local',
  passport.authenticate("local", {
  failureMessage: true
  }),
  async (req, res) => {
    console.log("successful login -- server login/local route");
    const { username } = req.body;
    try {
       const user = await User.findOne({ username: username });
       const accessToken = jwt.sign(
         {
           username: user.username,
         },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: "10s" }
       );
       const refreshToken = jwt.sign(
         {
           username: user.username,
         },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: "1d" }
       );
       const logUser = await User.findOneAndUpdate(
         { username: user.username },
         { refreshToken: refreshToken }
       );
       res.cookie("jwt", refreshToken, {
          httpOnly: true,
         secure: true,
         sameSite: "None",
         maxAge: 24 * 60 * 60 * 1000,
       });
      console.log(accessToken);
      return res.json({
        username: user.username,
        email: user.email,
        collections: user.collections,
        saved: user.saved,
        found: user.found,
        favorites: user.favorites,
        accessToken: accessToken,
      });

    } catch (err) {
      console.log('error finding user')
      console.log(err)
    }
  })

// Log out
router.post("/logout", async (req, res) => {
  // Reset refreshToken saved in user
  const token = req?.cookies?.jwt;
  if (token) {
    const logoutUser = await User.findOneAndUpdate(
      { refreshToken: token },
      { refreshToken: 'buttmunch' }
    );  
  }
// Clear refresh token in cookies
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  // Logout user with passport
  req.logout(function (err) {
    if (err) {
      res.send({ error: 'error logging out' })
    }
    res.send({ message: "Successfully logged out" });
  });
});


router.get("/refresh", async (req, res) => {
  console.log('this route is accessed');
  const token = req?.cookies?.jwt;
  if (!token) {
    console.log("NO TOKEN");
    return res.sendStatus(401);
  }
  console.log(token);

  const foundUser = await User.findOne({ refreshToken: token });
  console.log(foundUser);
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);    
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '10s'}
    )
    console.log(accessToken);
    res.json({ accessToken });
  }); 
})


router.get("/getuser", async (req, res) => {
  console.log("the getuser route is accessed");
  const token = req?.cookies?.jwt;
  if (!token) {
    console.log("NO TOKEN");
    return res.sendStatus(401);
  }
  console.log(token);

  const foundUser = await User.findOne({ refreshToken: token });
  console.log(foundUser);
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    console.log(accessToken);
    return res.json({
      username: foundUser.username,
      email: foundUser.email,
      collections: foundUser.collections,
      saved: foundUser.saved,
      found: foundUser.found,
      favorites: foundUser.favorites,
      accessToken: accessToken,
    });
  });
});


router.post('/test', (req, res, next) => {
  console.log('tested route')
})


export default router;
