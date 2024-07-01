const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const SendEmail = require("../utils/SendEmail");

const createToken=require("../utils/CreateToken");

exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = createToken(user._id);

  res.status(200).json({
    Data: user,
    token,
  });
});

exports.Login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("incorrect email or password", 401));
  }
  if(user.active===false){ 
    return next(new ApiError ("please RE activate your Account ",404));
  }
  const token = createToken(user._id);

  res.status(200).json({
    data: user,
    token,
  });
});


exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "You are not login, please login to get access this route",
        401
      )
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_Secret_Key);

  const currentUser = await User.findById(decoded.userID);
  if (!currentUser) {
    return next(
      new ApiError(
        "the User that belong to this token does no longet exist",
        401
      )
    );
  }

  if (currentUser.passwordChangedAt) {
    const passChangedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
  
  if (passChangedTimeStamp > decoded.iat) 
    return next(
      new ApiError(
        "User Recently changed his password,please login again..",
        401
      )
    );
  } 
  if (currentUser.active===false){ 
    return next(new ApiError('please reactivate your account ',404));
  }
  req.user = currentUser;

  next();
});

exports.allowedTO = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("Your are not allowed to access this route", 403)
      );
    }
    next();
  });

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  //check the valid email ,or user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with this email ${req.body.email}`, 404)
    );
  }

  // generate random resetcode
  const resetcode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetcode)
    .digest("hex");

  // save hased password reset code in db
  user.passwordResetCode = hashedResetCode;
  // add expireation time for password reset code (10min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  const message = `Hi ${user.name},\nWe received a request to reset the password on your E-shop Account.\n ${resetcode}\nEnter your reset code`;

  try {
    await SendEmail({
      email: user.email,
      subject: "Your Password reset code (valid for 10min)",
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
  }

  res.status(200).json({
    status: "success",
    message: "Reset code send to email",
  });
});

exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // get user based on password reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetcode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Reset Code Invalid Or Expired"));
  }

  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: "success",
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ApiError(`There is no user with this email ${req.body.email} `, 404)
    );
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset Code Not Verified", 404));
  }
  user.password=req.body.NewPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  const token = createToken(user._id); 

  res.status(200).json({ 
    token 
  }); 

});
