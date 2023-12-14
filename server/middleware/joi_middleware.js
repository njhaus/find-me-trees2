import Joi from 'joi'

// Existing user will have access token and saved/found/favories
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(20),
  email: Joi.string()
    .email()
    .min(4)
    .max(30),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?!.*s)(?=.{8,})")
    )
    .min(8),
  accessToken: Joi.string(),
  collections: Joi.array(),
  saved: Joi.array(),
  found: Joi.array(),
  favorites: Joi.array(),
});

// New user will not have access token or saved/found/favorites
const newUserSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(20),
  email: Joi.string().email().min(4).max(30),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?!.*s)(?=.{8,})")
    )
    .min(8)
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
      res.send({ error: error });
    } else {
      console.log("middleware successful .. moving to next \n\n");
      next();
    }
  } catch (err) {
    console.log(err);
    res.send({ error: error });
  }
};
