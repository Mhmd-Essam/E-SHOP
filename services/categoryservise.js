const multer = require("multer");
const asyncHandler = require("express-async-handler");
const {
  uploadsingleimage,
} = require("./../middlewares/uploadsinglemiddleware");

const sharp = require("sharp");

const apiError = require("./../utils/apiError");

const { v4: uuidv4 } = require("uuid");

const CategoryModel = require("../models/categorymodels");

const Factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const expressAsyncHandler = require("express-async-handler");

//const multerStorage =multer.diskStorage({
//destination:function(req,file,cb){
// cb(null,'uploads/categories' );
//},
//filename:function(req,file,cb){
//const extetion = file.mimetype.split('/')[1];
//  const filename = `category-${uuidv4()}-${Date.now()}.${extetion}`;
//    cb(null,filename);
//  },
//});

/*
const multerStorage = multer.memoryStorage();

function multerFilter(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new apiError("Only Images allowed", 400), false);
  }
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
*/

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  req.body.image = filename;

  next();
});
exports.uploadcategoryimage = uploadsingleimage("image");

exports.getCategory = Factory.getAll(CategoryModel);

exports.getspecifiCategory = Factory.getOne(CategoryModel);

exports.CreateCategory = Factory.createOne(CategoryModel);

exports.updateCategory = Factory.updateOne(CategoryModel);

exports.deleteCategory = Factory.deleteOne(CategoryModel);
