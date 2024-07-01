const express = require("express");
const ProudctServise = require("../services/ProudctServise");
const proudctValidator = require("../utils/validatrors/proudctValidator");
const authService = require("../services/authService"); 
const ReviewRoute = require("./ReviewRoute"); 

const router = express.Router();
router.use("/:productid/reviews", ReviewRoute);

router
  .route("/")
  .get(ProudctServise.getProudct)
  .post(authService.protect,authService.allowedTO("admin","manger"),ProudctServise.uploadProductimage,ProudctServise.resizeImage,proudctValidator.createProductValidator, ProudctServise.createProduct);

router
  .route("/:id")
  .get(proudctValidator.getProductValidator, ProudctServise.getSpecificProudct)
  .put(authService.protect,authService.allowedTO("admin","manger"),ProudctServise.uploadProductimage,ProudctServise.resizeImage,proudctValidator.updateProductValidator, ProudctServise.updateProudct)
  .delete(authService.protect,authService.allowedTO("admin"),proudctValidator.deleteProductValidator, ProudctServise.deletProudct);

module.exports = router;
