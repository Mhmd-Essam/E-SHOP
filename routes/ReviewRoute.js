const express = require("express");

const {
  getReview,
  getSpecificReview,
  createReview,
  updateReview,
  deleteReview,
  setfilterobject,
  setproductidANDusertoBody
} = require("../services/ReviewService");
const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validatrors/ReviewValidator");

const router = express.Router({ mergeParams:true});
const authService = require("../services/authService");

router
  .route("/")
  .get(setfilterobject,getReview)
  .post(
    authService.protect,
    authService.allowedTO("user"),
    setproductidANDusertoBody,
    createReviewValidator,
    createReview
  );

router
  .route("/:id")
  .get(getSpecificReview)
  .put(
    authService.protect,
    authService.allowedTO("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authService.protect,
    authService.allowedTO("user", "admin", "manger"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
