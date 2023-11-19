import Joi from "joi";
import sanitizeHtml from "sanitize-html";

import User from "../models/user";

// Joi validataion
export class AppError extends Error {
  constructor(message, status) {
    super();
    (this.message = message), (this.status = status);
  }
}

// sanitize-html extension for strings
const extension = Joi.extend((joi) => {
  return {
    type: "string",
    base: Joi.string(),
    messages: {
      "string.cleanHtml": "{{#label}} may not contain html.",
    },
    rules: {
      cleanHtml: {
        validate(value, helpers) {
          const clean = sanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},
            allowedIframeHostnames: [],
          });
          if (clean !== value) return helpers.error("string.cleanHtml");
          return value;
        },
      },
    },
  };
});

// JOI validation schema
export const userValidation = extension.object({
  username: extension.string().cleanHtml().min(4).max(20).required(),
  email: extension.string().cleanHtml().email(),
  password: extension
    .string()
    .cleanHtml()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$"
      )
    ),
  trusted: extension.string(),
});


// Validation middleware

export const validateUser = (req, res, next) => {
  const result = userValidation.validate(req.body);
  if (result.error) {
    console.log(result.error);
    let errMsg = result.error.details.map((item) => item.message).join(", ");
    if (errMsg.match('"password" with value'))
      errMsg =
        "Your password must contain at least 1 capital letter, 1 lowercase letter, and 1 number or special character.";
    req.flash("error", errMsg);
    res.redirect("/login/register");
  } else {
    next();
  }
};
