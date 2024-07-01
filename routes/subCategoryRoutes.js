const express = require("express");
const subCategoryServise = require("../services/subcategoryservise");
const {
  createSubCategoryValidators,
  getSubCategoryValidators,
  updateSubCategoryValidators,
  deleteSubCategoryValidators,
} = require("../utils/validatrors/subcategoryvalidators");
const authService = require("../services/authService"); 

const router = express.Router({ mergeParams:true});

router
  .route("/")
  .get(subCategoryServise.setfilterobject,subCategoryServise.getsubCategory)
  .post(authService.protect,authService.allowedTO("admin","manger"),subCategoryServise.setCategoryidtoBody, createSubCategoryValidators, subCategoryServise.CreateSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidators, subCategoryServise.getspecifiSubCategory)
  .put(authService.protect,authService.allowedTO("admin","manger"),updateSubCategoryValidators, subCategoryServise.updatesubCategory)
  .delete(authService.protect,authService.allowedTO("admin"),deleteSubCategoryValidators, subCategoryServise.deleteSubCategory);

module.exports = router;
