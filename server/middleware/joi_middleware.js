import Joi from 'joi'

// Existing user will have access token, _id, and saved/found/favories
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(20).required(),
  email: Joi.string().email().min(4).max(30),
  password: Joi.string().min(8),
  accessToken: Joi.string(),
  collections: Joi.array(),
  saved: Joi.array(),
  found: Joi.array(),
  favorites: Joi.array(),
  _id: Joi.string()
});

// New user will not have access token or saved/found/favorites. Includes items from updateing profile such as 'newUsername, etc.', but NOT required as these are only used when updating user profile
const newUserSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(20).required(),
  email: Joi.string().email().min(4).max(30).required(),
  password: Joi.string().min(8)
    .required(),
  newUsername: Joi.string().alphanum().min(4).max(20),
  newEmail: Joi.string().email().min(4).max(30),
  newPassword: Joi.string()
    .empty(""),
  accessToken: Joi.string(),
});



export const validateUpdateUser = async function (req, res, next) {
    const userData = req.body;
    console.log('\n\nUpdate user middleware!')
    console.log(userData)
    try {
        const { error, value } = await userSchema.validate(userData);
        if (error) {
            console.log(error)
            res.send({ error: error })
        }
        else {
            console.log('middleware successful .. moving to next \n\n')
            next()
        }
    } catch (err) {
        console.log(err);
        res.send({ error: error });
    }
}


export const validateNewUser = async function (req, res, next) {
  const userData = req.body;
  console.log("\n\nNew user middleware!");
  console.log(userData);
  try {
    const { error, value } = await newUserSchema.validate(userData);
    if (error) {
      console.log(error);
      return res.send({ error: error });
    } else {
      console.log("middleware successful .. moving to next \n\n");
      next();
    }
  } catch (err) {
    console.log(err);
    return res.send({ error: error });
  }
};
