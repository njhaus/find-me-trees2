import User from "../../models/user.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

// Register user
// -need to add flash messages or other feedback mechanism for failed / successful registration
export const registerNewUser = async (req, res, next) => {
  console.log("register route accessed");
  const { username, email, password } = req.body;
  const existingUsername = await User.findOne({ username: username });
  const existingUserEmail = await User.findOne({ email: email });

  // Create a refresh token and access token
  if (!existingUsername && !existingUserEmail) {
    try {
      const accessToken = jwt.sign(
        {
          username: username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        {
          username: username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 12 * 60 * 60 * 1000,
      });
      const newUser = await new User({
        username: username,
        email: email,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

      // Register user with passport
      const registeredUser = await User.register(newUser, password);
      await req.login(registeredUser, function (err) {
        if (err) {
          console.log("error logging in");
          return res.send({code:'401', error: "error logging in."});
        } else {
          console.log("user registered and logged in!");
        }
      });

      // Success -- return user data (sans password and refresh token)
      return res.send({
        username: newUser.username,
        email: newUser.email,
        collections: newUser.collections,
        saved: newUser.saved,
        found: newUser.found,
        favorites: newUser.favorites,
        accessToken: accessToken,
      });
    } catch (err) {
      console.log(err);
    }
  } else if (existingUsername) {
    console.log("existing username");
    res.send({code: '401', error: "A user with that username already exists" });
  } else if (existingUserEmail) {
    console.log("existing email");
    res.send({ code: "401", error: "A user with that email already exists" });
  } else {
    console.log("unspecified error");
    res.send({
      code: "401",
      error: "An error occurred while making your request.",
    });
  }
};


// Local login
export const loginLocal = async (req, res) => {
    console.log("successful login -- server login/local route");
    const { username } = req.body;
    try {
       const accessToken = jwt.sign(
         {
           username: username,
         },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: "10m" }
       );
       const refreshToken = jwt.sign(
         {
           username: username,
         },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: "1d" }
       );
       const user = await User.findOneAndUpdate(
         { username: username },
         {
           accessToken: accessToken,
           refreshToken: refreshToken,
         },
         { new: true }
       )
         .populate("saved._id")
         .populate("found._id")
         .populate("favorites._id");
       res.cookie("jwt", refreshToken, {
         httpOnly: true,
         secure: true,
         sameSite: "None",
         maxAge: 12 * 60 * 60 * 1000,
       });
      
      return res.send({
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
  }


//   Log out
export const logout = async (req, res) => {
  const { username } = req.body;
  // Log out user and reset tokens
  const logoutUser = await User.findOneAndUpdate(
    { username: username },
    {
      accessToken: "",
      refreshToken: "",
    }
  );
  // Clear refresh token in cookies
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 12 * 60 * 60 * 1000,
  });
  // Logout user with passport
  req.logout(function (err) {
    if (err) {
      res.send({ code: "400", error: "error logging out" });
    }
    res.send({ code: "200", message: "Successfully logged out" });
  });
};


// check refresh token and refresh user access token -- runs on every user action
export const handleToken = async (req, res) => {
  console.log("the getuser route is accessed");
  const token = req?.cookies?.jwt;

  if (!token) {
    console.log("NO TOKEN");
    return res.send({
      code: "401",
      error: "No user logged in.",
    });
  }

  const foundUser = await User.findOne({ refreshToken: token });
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 12 * 60 * 60 * 1000,
    });
    return res.send({code: '401', error: 'Unable to update token: user not found.'});
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser?.username !== decoded.username) {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 12 * 60 * 60 * 1000,
      });
      return res.send({ code: "403", error: "Unable to update token. Incorrect credentials" });
    }
  });

  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  const updatedUser = await User.findOneAndUpdate(
    { refreshToken: token },
    { accessToken: accessToken },
    { new: true }
  )
    .populate("saved._id")
    .populate("found._id")
    .populate("favorites._id");

  if (!updatedUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 12 * 60 * 60 * 1000,
    });
    return res.send({ code: "401", error: "Unable to update token: user not found" });
  }

  return res.send({
    username: updatedUser.username,
    email: updatedUser.email,
    collections: updatedUser.collections,
    saved: updatedUser.saved,
    found: updatedUser.found,
    favorites: updatedUser.favorites,
    accessToken: accessToken,
  });
};