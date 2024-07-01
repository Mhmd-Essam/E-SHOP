const subCategoryModel = require("../models/subCategoryModel");

const Factory = require("./handlersFactory");

exports.setCategoryidtoBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryid;
  next();
};

exports.setfilterobject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryid) filterObject = { category: req.params.categoryid };
  req.filterobj = filterObject;
  next();
};
exports.getsubCategory = Factory.getAll(subCategoryModel);

exports.CreateSubCategory = Factory.createOne(subCategoryModel);

exports.getspecifiSubCategory = Factory.getOne(subCategoryModel);

exports.updatesubCategory = Factory.updateOne(subCategoryModel);

exports.deleteSubCategory = Factory.deleteOne(subCategoryModel);
