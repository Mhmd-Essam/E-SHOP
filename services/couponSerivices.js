const asyncHandler = require("express-async-handler");
const coupon = require("../models/couponModel");
const Factory = require("./handlersFactory");

exports.getcoupons = Factory.getAll(coupon);

exports.getspecificoupon = Factory.getOne(coupon);

exports.Createcoupon = Factory.createOne(coupon);

exports.updatecoupon = Factory.updateOne(coupon);

exports.deletecoupon = Factory.deleteOne(coupon);
