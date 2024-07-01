const asyncHandler = require("express-async-handler");
const Factory = require("./handlersFactory");

const Review = require("../models/reviewModel");

exports.setfilterobject = (req, res, next) => {
  let filterObject = {};
  if (req.params.productid) filterObject = { product: req.params.productid };
  req.filterobj = filterObject;
  next();
};

exports.setproductidANDusertoBody = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productid;
    if (!req.body.user) req.body.user = req.user._id;
    next();
  };

// @desc    Get list of Review
// @route   GET /api/v1/Review
// @access  Public
exports.getReview = Factory.getAll(Review);

// @desc    Get specific Review by id
// @route   GET /api/v1/Review/:id
// @access  Public
exports.getSpecificReview = Factory.getOne(Review);

// @desc    Create Review
// @route   POST  /api/v1/brands
// @access  Private/protect/User
exports.createReview = Factory.createOne(Review);

// @desc    Update specific brand
// @route   PUT /api/v1/Review/:id
// @access  Private/protect/user
exports.updateReview = Factory.updateOne(Review);

// @desc    Delete specific brand
// @route   DELETE /api/v1/Review/:id
// @access  Private/protect/user

exports.deleteReview = Factory.deleteOne(Review);
