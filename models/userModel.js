const mongoose = require("mongoose");

const bcrypt = require('bcryptjs'); 
const { bool } = require("sharp");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, " Name Required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      required: [true, "Password Required"],
      minlength: [6, " Too short password"],
    },
    role: {
      type: String,
      enum: ["user","manger","admin"],
      default: "user",
    },
    passwordChangedAt: Date ,
    passwordResetCode:String,
    passwordResetExpires:Date,
    passwordResetVerified:Boolean, 
    active:{
      type:Boolean,
      default:true
    }, 

      wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ], 
    addresses:[{
      id:{type:mongoose.Schema.Types.ObjectId}, 
      alies:String,
      details:String,
      phone:String,
      city:String,
      postalcode:String,
    }]
    
  },

  { timestamps: true }
);

UserSchema.pre("save",async function(next){
  this.password = await bcrypt.hash(this.password,12);
  next();
})
/*
const setimageURL = (doc) => {
  const imageURL = `${process.env.BASE_URL}/users/${doc.profileImg}`;
  doc.profileImg = imageURL;
};
UserSchema.post("init", (doc) => {
  setimageURL(doc);
});
UserSchema.post("save", (doc) => {
  setimageURL(doc);
});


*/
module.exports = mongoose.model('User', UserSchema);

