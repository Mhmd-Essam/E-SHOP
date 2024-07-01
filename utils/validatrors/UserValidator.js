const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");
const bcrypt = require('bcryptjs'); 

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.createUserValidator = [
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
    
    check('passwordConfirm').notEmpty().withMessage('password confirmation reequired'),

    check('phone').optional().isMobilePhone(['ar-EG','ar-SA']),

    check('profileImg').optional(),

    check('role').optional(),

  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  body("name")
    .optional()
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
    check('phone').optional().isMobilePhone(['ar-EG','ar-SA']),

    check('profileImg').optional(),

    check('role').optional(),

  validatorMiddleware,
];


exports.ChangeUserPasswordValidator=[
  check("id").isMongoId().withMessage("Invalid user id format"),
  body("CurrentPassword")
  .notEmpty()
  .withMessage('currentPassword is required'),

  body("PasswordConfirm")
  .notEmpty()
  .withMessage('you must enter the password confirm'), 

  body("password")
  .notEmpty()
  .withMessage("you must enter the password")
  .custom(async(val,{req})=>{ 
    const user = await User.findById(req.params.id); 
    if(!user){
      throw new Error('there is no user with this id');
    }
    const isCorrectPassword = await bcrypt.compare(req.body.CurrentPassword,user.password); 
    if(!isCorrectPassword){ 
      throw new Error('incorrect current Password')
    }
    if(val!=req.body.PasswordConfirm){ 
      throw new Error ('password confirmation incorrect'); 
    }
    return true ;
  }),
  validatorMiddleware,
]

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validatorMiddleware,
];


exports.updateloggedUserValidator = [
 
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    check('email')
    .optional()
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
    check('phone').optional().isMobilePhone(['ar-EG','ar-SA']),


  validatorMiddleware,
];
