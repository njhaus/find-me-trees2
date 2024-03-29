import { Router } from "express";
import User from "../models/user.js";
import { verifyAccessToken } from "../middleware/jwt_middleware.js";
import { validateNewUser, validateUpdateUser } from "../middleware/joi_middleware.js";
import passport from "passport";

const router = Router();

// Test route
router.get('/', (req, res, next) => {
    res.send({code: '200', message: 'user route works!'})
})

// Update user trees
router.patch("/update", validateUpdateUser, verifyAccessToken, async (req, res) => {
  console.log("UPDATE user route accessed");
  const userData = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        username: userData.username,
        // username: 'errorTest'
      },
      {
        username: userData.username,
        email: userData.email,
        collections: userData.collections,
        saved: userData.saved,
        found: userData.found,
        favorites: userData.favorites,
      },
      { new: true }
    )
      .populate("saved._id")
      .populate("found._id")
      .populate("favorites._id");
    if (updatedUser) {
      return res.send({
        username: updatedUser.username,
        email: updatedUser.email,
        collections: updatedUser.collections,
        saved: updatedUser.saved,
        found: updatedUser.found,
        favorites: updatedUser.favorites,
        accessToken: userData.accessToken,
      }); 
    } else {
      throw new Error()
    }
  } catch (err) {
    console.log(err);
    return res.send({
      error: err,
      code: "400",
      message: "There was an error saving your changes",
      devMsg: "User not found in database or database not able to connect."
    });
  }
});


// Update user profile -- validate new user because all tree data is not being passed through
router.patch(
  "/profileupdate",
  verifyAccessToken,
  validateNewUser,
  passport.authenticate("local", {
    failureMessage: true,
  }),
  async (req, res) => {
    console.log("UPDATE PROFILE ROUTE ACCESSED");
    const { username, newUsername, newEmail, newPassword } = req.body;
    const updateObject = {
      username: newUsername,
      email: newEmail
    };
    try {
      const foundUser = await User.findOneAndUpdate(
        { username: username },
        updateObject,
        { new: true }
      )
        .populate("saved._id")
        .populate("found._id")
        .populate("favorites._id");
      if (!foundUser) {
          return res.send({
            error: err,
            code: "400",
            message: "There was an error saving your changes",
            devMsg: "Error finding current user.",
          });
      }
      if (newPassword) {
        try {
          const deletedUser = await User.deleteOne({ username: newUsername });
          if (!deletedUser) {
            return res.send({
              error: err,
              code: "400",
              message: "There was an error saving your changes",
              devMsg: "Error deleting old user with old password.",
            });
          }
          const newUserObject = {
            username: foundUser.username,
            email: foundUser.email,
            collections: foundUser.collections,
            accessToken: foundUser.accessToken,
            refreshToken: foundUser.refreshToken,
            saved: foundUser.saved,
            found: foundUser.found,
            favorites: foundUser.favorites,
          };
          const newUser = await new User(newUserObject);
          if (!newUser) {
            return res.send({
              error: err,
              code: "400",
              message: "There was an error saving your changes",
              devMsg: "Error Creating new user with new password.",
            });
          }
          const registeredUser = await User.register(newUser, newPassword)
            .populate("saved._id")
            .populate("found._id")
            .populate("favorites._id");
          await req.login(registeredUser, function (err) {
            if (err) {
              console.log("error logging in");
              return res.send({
                error: err,
                code: "400",
                message: "There was an error saving your changes",
                devMsg:
                  "Error logging in updated user.",
              });
            } else {
              console.log("user registered and logged in!");
            }
          });
          console.log("UPDATE PROFILE SUCCESS! (with password change)")
          res.send(registeredUser);
        } catch (err) {
          return res.send({
            error: err,
            code: "400",
            message: "There was an error saving your changes",
            devMsg: "User not found in database or database not able to connect.",
          });
        }
      }
      else {
        console.log('UPDATE PROFILE SUCCCESS! (No password change)')
        res.send(foundUser);
      }
    } catch (err) {
      return res.send({
      error: err,
      code: "400",
      message: "There was an error saving your changes",
      devMsg: "User not found in database or database not able to connect."
    })
    }
});

export default router;