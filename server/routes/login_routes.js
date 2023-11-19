import { Router } from "express";
import User from "../models/user.js";

const router = Router();

router.get("/", (req, res, next) => {
  res.send("login route works!");
});

// Register user 
// -need to add flash messages or other feedback mechanism for failed / successful registration
// -Need to connect to JOI User schema validation
router.post('/register', async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const existingUsername = await User.findOne({ username: username });
  const existingUserEmail = await User.findOne({ email: email });
  if (!existingUsername && !existingUserEmail) {
    try {
      const user = new User({ username: username, email: email });
      const registeredUser = await User.register(user, password);
      await req.login(registeredUser, function (err) {
        if (err) console.log('error registering user')
        else console.log("user registered!");
            })   
    } catch (err) {
      let errMsg = "Error registering. Please try again later.";
      if (err.code && err.code === 11000) errMsg = "There is already an account associated with this email address.";
      console.log(errMsg);
    }
  }
  else if (existingUsername) {
    console.log('A user with that username already exists');
  }
  else if (existingUserEmail) {
    console.log("A user with that email already exists");
  }
  else {
    console.log("An error occurred while making your request.");
  }
  res.send('The route worked.')
})

export default router;
