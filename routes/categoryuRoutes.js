const express = require("express");
const categoryServise = require("../services/categoryservise");
const categoryValidation = require("../utils/validatrors/categoryValidators");
const subcategoryRoute = require("./subCategoryRoutes");

const authService = require("../services/authService"); 


const router = express.Router();

router
  .route("/")
  .get(categoryServise.getCategory)
  .post(authService.protect,authService.allowedTO("admin","manger"),categoryServise.uploadcategoryimage,categoryServise.resizeImage,categoryValidation.createCategoryValidators,categoryServise.CreateCategory);

router.use("/:categoryid/subcategories", subcategoryRoute);

router
  .route("/:id")
  .get(
    categoryValidation.getCategoryValidators,
    categoryServise.getspecifiCategory
  )
  .put(authService.protect,authService.allowedTO("admin","manger"),
    categoryServise.uploadcategoryimage,categoryServise.resizeImage,
    categoryValidation.updateCategoryValidators,
    categoryServise.updateCategory
  )
  .delete(authService.protect,authService.allowedTO("admin"),
    categoryValidation.deleteCategoryValidators,
    categoryServise.deleteCategory
  );

module.exports = router;
