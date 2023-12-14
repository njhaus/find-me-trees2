import { Router } from "express";
import User from "../models/user.js";
import { verifyAccessToken } from "../middleware/jwt_middleware.js";
import { validateUpdateUser } from "../middleware/joi_middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
    res.send('user route works!')
})

// Update user
router.patch("/update", validateUpdateUser, verifyAccessToken, async (req, res) => {
  console.log("UPDATE user route accessed");
  const userData = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        username: userData.username,
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
    return res.send({
      username: updatedUser.username,
      email: updatedUser.email,
      collections: updatedUser.collections,
      saved: updatedUser.saved,
      found: updatedUser.found,
      favorites: updatedUser.favorites,
      accessToken: userData.accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
});

export default router;