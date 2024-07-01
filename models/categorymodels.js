const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      minlength: [3, "Too short Category name"],
      maxlength: [32, "Too long Category name"],
      unique: [true, "Category must be unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setimageURL = (doc) => {
  if(doc.image){
  const imageURL = `${process.env.BASE_URL}/categories/${doc.image}`;
  doc.image = imageURL;
}
};

CategorySchema.post("init", (doc) => {
  setimageURL(doc);
});
CategorySchema.post("save", (doc) => {
  setimageURL(doc);
});
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
