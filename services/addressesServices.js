const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.addAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "address added successfully",
    data: user.addresses,
  });
});

exports.removeAdresses = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate( req.user._id,{
       $pull:{addresses:{_id:req.params.addressesId}}
    },{new:true})
    res.status(200).json({ 
        status:'success',
        message:'Addres removed Successfuly.', 
        data:user.addresses
    })
});


exports.getLoggedUserAddresses = asyncHandler(async(req,res,next)=>{ 
     const user = await User.findById(req.user._id).populate('addresses') ; 
     res.status(200).json({ 
        status:'success', 
        results:user.addresses.length, 
        data:user.addresses,
     });
}); 




