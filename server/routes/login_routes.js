import { Router } from "express";
import User from "../models/user.js";
import passport from "passport";

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
           const loggedInUser = {
             username: registeredUser.username,
             email: registeredUser.email,
             collections: registeredUser.collections,
             saved: registeredUser.saved,
             found: registeredUser.found,
             favorites: registeredUser.favorites,
           };
          return res.send(JSON.stringify(loggedInUser));
        }
            })   
    } catch (err) {
      let errMsg = "Error registering. Please try again later.";
      if (err.code && err.code === 11000) errMsg = "There is already an account associated with this email address.";
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


router.post(
  '/local',
  passport.authenticate("local", {
  failureMessage: true
  }),
  async (req, res) => {
    console.log(req.isAuthenticated());
    console.log("successful login -- server login/local route");
    const { username, passworrd } = req.body;
    const user = await User.findOne({ username: username });
    console.log(user);
    const loggedInUser = {
      username: user.username,
      email: user.email,
      collections: user.collections,
      saved: user.saved,
      found: user.found,
      favorites: user.favorites
    }
    res.send(JSON.stringify(loggedInUser));
  })


router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      res.send({ error: 'error logging out' })
    }
    res.send({ message: "Successfully logged out" });
  });
});


export default router;
