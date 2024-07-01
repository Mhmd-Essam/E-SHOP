const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const {uploadMixOfimages}=require("./../middlewares/uploadsinglemiddleware")
const Factory = require("./handlersFactory");
const ProductModel = require("../models/ProductModel");

const apiError = require("../utils/apiError");



exports.uploadProductimage = uploadMixOfimages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imagecoverfilename = `proudct-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imagecoverfilename}`);

    req.body.imageCover = imagecoverfilename;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imagename = `proudct-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${imagename}`);

        req.body.images.push(imagename);
      })
    );
    next();
  }
});

exports.getProudct = Factory.getAll(ProductModel);

exports.getSpecificProudct = Factory.getOne(ProductModel,'reviews');

exports.createProduct = Factory.createOne(ProductModel);

exports.updateProudct = Factory.updateOne(ProductModel);

exports.deletProudct = Factory.deleteOne(ProductModel);
