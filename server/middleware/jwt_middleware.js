import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

import User from "../models/user.js";

export const verifyAccessToken = async (req, res, next) => {
    console.log('accesstoken middleware running')
    const { accessToken, username } = req.body;
    console.log(username);
    console.log(accessToken);
    const foundUser = await User.findOne(
        {
            username: username,
        }
    )
    console.log(foundUser)
    if (!foundUser) {
        console.log('no matching creds')
        return res.send("error: no user found")
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {
            const errMsg = err ? err : 'Unverified Credentials'
            console.log(errMsg);
            return res.send("error: incorrect token")
      }
    });
    console.log("accesstoken middleware no errors\n\n");
    next();
};
