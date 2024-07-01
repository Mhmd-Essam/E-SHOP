const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }

    // Trigger "remove" event when update document
    document.deleteOne();
    res.status(204).send();
  });


exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id,req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`no proudct with this id ${req.params.id}`, 404)
      );
    }
    // trigger of save review model to calc ratings before update 
    document.save();
    res.status(200).json({
      data: document,
    });
  });

exports.createOne = (model) =>
  asyncHandler(async (req, res) => {
    const document = await model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (model,populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params ;
    let query = model.findById(id);
    if(populationOpt){
      query = query.populate(populationOpt);
    }
    const document = await query;

    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (model) =>
  asyncHandler(async (req, res) => {
    let filter = {}; 
    if(req.filterobj){
      filter=req.filterobj ; 
    }
    const documentcount = await model.countDocuments();
    const Apifeatures = new ApiFeature(model.find(filter), req.query)
      .paginate(documentcount)
      .filter()
      .search()
      .LimitFields()
      .sort();

    const { mongooseQuery, paginationResult } = Apifeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
