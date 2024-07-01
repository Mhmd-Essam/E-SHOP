const asyncHandler = require("express-async-handler"); 
// eslint-disable-next-line import/extensions
const User = require ("../models/userModel.js"); 


exports.addProductToWishList = asyncHandler(async(req,res,next)=>{ 
    const user = await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.productId}},{
        new:true
    })
    res.status(200).json({
        status:'success', 
        message:'product added successfuly to your wishlist', 
        data:user.wishlist
    });
});



exports.removeProductFromWishlist  = asyncHandler(async(req,res,next)=>{ 
    const user = await User.findByIdAndUpdate(req.user._id,{$pull:{wishlist:req.params.productId}},{
        new:true
    })
    res.status(201).json({
        status:'success', 
        message:'product removed successfuly from your wishlist', 
        data:user.wishlist
    });
});



exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('wishlist');
  
    res.status(200).json({
      status: 'success',
      results: user.wishlist.length,
      data: user.wishlist,
    });
  });