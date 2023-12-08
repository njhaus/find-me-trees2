import { Router } from "express";
import User from "../models/user.js";
import { verifyAccessToken } from "../middleware/jwt_middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
    res.send('user route works!')
})

router.patch('/update', verifyAccessToken, async (req, res) => {
    console.log('user route accessed')
    console.log(req.body);
    const userData = req.body;
  console.log('saved/faves/found')
  console.log(req.body.favorites)
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
        console.log(err)
        return res.sendStatus(401)
    }
})

export default router;