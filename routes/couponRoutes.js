const express = require("express");

const authService = require("../services/authService");

const {
  getcoupons,
  getspecificoupon,
  Createcoupon,
  updatecoupon,
  deletecoupon,
} = require("../services/couponSerivices");

const router = express.Router();

router.use(authService.protect, authService.allowedTO("admin", "manger"));
router.route("/").get(getcoupons).post(Createcoupon);
router
  .route("/:id")
  .get(getspecificoupon)
  .put(updatecoupon)
  .delete(deletecoupon);

module.exports = router;
