const express = require("express");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validatrors/brandValidator");

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandimage,
  resizeImage,
} = require("../services/brandservise");
const authService = require("../services/authService"); 

const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(authService.protect,authService.allowedTO("admin","manger"),uploadBrandimage, resizeImage, createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(authService.protect,authService.allowedTO("admin","manger"),uploadBrandimage, resizeImage,updateBrandValidator, updateBrand)
  .delete(authService.protect,authService.allowedTO("admin"),deleteBrandValidator, deleteBrand);

module.exports = router;
