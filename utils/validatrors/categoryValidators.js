const {check,body} = require('express-validator');
const slugify = require("slugify");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getCategoryValidators =[

    check('id').isMongoId().withMessage('invalid category id format'),
    validatorMiddleware

]


exports.createCategoryValidators=[
    check('name')
    .notEmpty()
    .withMessage("name Category required")
    .isLength({min:3})
    .withMessage("Too short Category name")
    .isLength({max:32})
    .withMessage("Too long Category name")
    .custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true 
    }),
    validatorMiddleware
]


exports.updateCategoryValidators=[

    check('id').isMongoId().withMessage('invalid category id format'),
    body('name').custom((val,{req})=>{
        req.body.slug = slugify(val)
        return true 
    }),
    validatorMiddleware

]

exports.deleteCategoryValidators=[

    check('id').isMongoId().withMessage('invalid category id format'),
    validatorMiddleware
    
]