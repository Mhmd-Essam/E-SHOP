const mongoose = require("mongoose");
const product = require('./ProductModel'); 

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    ratings: {
      type: Number,
      min: [1, "Min ratings Value is 1.0"],
      max: [5, "Max ratings Value is 5.0"],
      required: [true, "Rating must br required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must Belong to User"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must Belong to Product"],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" });
  next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
  productId
) {
  const result = await this.aggregate([
    // Stage 1 : get all reviews in specific product
    {
      $match: { product: productId },
    },
    // Stage 2: Grouping reviews based on productID and calc avgRatings, ratingsQuantity
    {
      $group: {
        _id: 'product',
        avgRatings: { $avg: '$ratings' },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  // console.log(result);
  if (result.length > 0) {

    await product.findByIdAndUpdate(productId, {
      ratingsAverage: result[0].avgRatings,
      ratingQuantity: result[0].ratingsQuantity,
    });
  } 
  else {
    await product.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingQuantity: 0,
    });
  }
};

reviewSchema.post('save', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post('deleteOne', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});


module.exports = mongoose.model("Review", reviewSchema);
