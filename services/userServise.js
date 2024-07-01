const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const Factory = require("./handlersFactory");
const User = require("../models/userModel");
const createToken = require("../utils/CreateToken");

const { uploadsingleimage } = require("../middlewares/uploadsinglemiddleware");

exports.uploadUserIMG = uploadsingleimage("profileImg");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `User-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(1080, 720)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/Users/${fileName}`);

    req.body.profileImg = fileName;
  }
  next();
});

exports.getUsers = Factory.getAll(User);

exports.getUser = Factory.getOne(User);

exports.createUser = Factory.createOne(User);

exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`no proudct with this id ${req.params.id}`, 404));
  }

  res.status(200).json({
    data: document,
  });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`no proudct with this id ${req.params.id}`, 404));
  }

  res.status(200).json({
    data: document,
  });
});

exports.getLogedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.updateloggeduserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(`no proudct with this id ${req.params.id}`, 404));
  }
  const token = createToken(req._id);

  res.status(200).json({
    data: user,
    token,
  });
});
exports.updateloggeduserDate = asyncHandler(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    data: updateUser,
  });
});

exports.deleteloggedUser = asyncHandler(async(req,res,next)=>{
  await  User.findByIdAndUpdate(req.user._id,{active:false});
  res.status(204).json({
    status:"success"
  })
});


exports.activateloggedUser=asyncHandler(async(req,res,next)=>{ 
  const user = await User.findOneAndUpdate({ email: req.body.email },{
    active:true
  },{
    new:true
  });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("incorrect email or password", 401));
  }
  
 const token = createToken(user._id);

 res.status(201).json({
  status:"success",
  data:user,
  token
 })
})


exports.deleteUser = Factory.deleteOne(User);
