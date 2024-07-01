const mongoose = require("mongoose");

const ProudctSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minlength: [3, "Too short proudct name "],
      maxlength: [100, "Too long proudct name "],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [3, "Too short description "],
    },
    quantity: {
      type: Number,
      required: [true, ";proudct quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: [10, "Too long proudct price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    imageCover: {
      type: String,
      required: [true, "Product Image cover is required"],
    },

    images: [String],

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Proudct must be belong to category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
ProudctSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});
ProudctSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  });
  next();
});

const setimageURL = (doc) => {
  if (doc.imageCover) {
    const imagecoverURL = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imagecoverURL;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imagesURL = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imagesURL);
    });
    doc.images = imagesList;
  }
};

ProudctSchema.post("init", (doc) => {
  setimageURL(doc);
});
ProudctSchema.post("save", (doc) => {
  setimageURL(doc);
});

module.exports = mongoose.model("Product", ProudctSchema);
