const joi = require("joi");

const validator = (req, res, next) => {
  const schema = joi.object({
    names: joi
      .string()
      .min(2)
      .max(15)
      .required()
      .messages({ "string.min": "The name must contain at least 2 letters", "string.empty": " Name is not allowed to be empty" }),
 
    eMail: joi
      .string()
      .email()
      .required()
      .messages({ "string.email": "Please write a valid email", "string.empty": " Email is not allowed to be empty" }),

    password: joi.string().trim().required().min(5).messages({
      "string.empty": " Password must contain at least 5 characters",
      "string.min": "The password must contain at least 5 letters",
    }),
    urlImage: joi
      .string()   
      .required()
      .min(2)
      .messages({ "string.empty": "You must use a valid url" }),
      description: joi.string().required().messages({"string.empty": " Description is not allowed to be empty"}),
      address: joi.string().messages({"string.empty": " Address is not allowed to be empty"}),
  });
  const validation = schema.validate(req.body, { abortEarly: false });
  if (!validation.error) {
    next();
  } else {
    //   validation.error.details.map(error => {
        res.render("signUp", {
            title: "Sign Up",
            loggedIn: req.session.loggedIn, 
            error: validation.error.details[0].message,
        })

    //   })
  }
};

module.exports = validator;
