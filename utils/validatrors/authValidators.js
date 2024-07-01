const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");


exports.signUpValidator = [
  check("name")
    .notEmpty()
    .withMessage("UserName required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),

    check('password')
    .notEmpty()
    .isLength({min:6})
    .withMessage('password is Required').custom((password,{req})=>{
        if(password!=req.body.passwordConfirm){
            throw new Error('password confirmation incorrect');
        } 
        return true;

    }),
    

  validatorMiddleware,
];


exports.loginValidator=[

  check('email')
  .notEmpty()
  .withMessage('Email required')
  .isEmail()
  .withMessage('Invalid email address'),
  check('password')
  .notEmpty()
  .isLength({min:6})
  .withMessage('password is Required'),
  validatorMiddleware,

]

