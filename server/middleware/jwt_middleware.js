import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

import User from "../models/user.js";

export const verifyAccessToken = async (req, res, next) => {
    console.log('accesstoken middleware running')
    console.log(req.body);
    const { accessToken, username } = req.body;
    const foundUser = await User.findOne(
        {
            username: username,
        }
    )
    console.log(foundUser.accessToken)
    if (!foundUser) {
        console.log('no matching creds')
        return next('error')
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {
            const errMsg = err ? err : 'Unverified Credentials'
            console.log(errMsg);
            return next(err);
      }
    });
    console.log("accesstoken no errors");
    next();
};
