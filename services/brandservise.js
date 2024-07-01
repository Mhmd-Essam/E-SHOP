const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const Factory = require("./handlersFactory");

const Brand = require("../models/BrandModel");

const { uploadsingleimage } = require("../middlewares/uploadsinglemiddleware");

exports.uploadBrandimage = uploadsingleimage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `Brands-${uuidv4()}-${Date.now()}.jpeg`;
 if(req.file){
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/Brands/${filename}`);

  req.body.image = filename;
 }
  next();
});

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = Factory.getAll(Brand);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = Factory.getOne(Brand);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = Factory.createOne(Brand);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = Factory.updateOne(Brand);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private

exports.deleteBrand = Factory.deleteOne(Brand);
