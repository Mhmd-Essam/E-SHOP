const { check,body} = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidators =[

    check('id').isMongoId().withMessage('invalid category id format'),
    validatorMiddleware

]

exports.createSubCategoryValidators = [
  check("name")
    .notEmpty()
    .withMessage("name Category required")
    .isLength({ min: 2 })
    .withMessage("Too short Category name")
    .isLength({ max: 32 })
    .withMessage("Too long Category name").custom((val,{req})=>{
      req.body.slug = slugify(val)
      return true 
  }),
  check("category")
    .notEmpty()
    .withMessage("subcategory must be belong category")
    .isMongoId()
    .withMessage("invalid category id format"),
  validatorMiddleware,
];


exports.updateSubCategoryValidators=[

    check('id').isMongoId().withMessage('invalid category id format'),
    body('name').custom((val,{req})=>{
      req.body.slug = slugify(val)
      return true 
  }),
    validatorMiddleware

]


exports.deleteSubCategoryValidators=[

    check('id').isMongoId().withMessage('invalid category id format'),
    validatorMiddleware

]
