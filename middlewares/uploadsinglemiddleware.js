const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerOptions= ()=>{ 
  const multerStorage = multer.memoryStorage();

  function multerFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Images allowed", 400), false);
    }
  }
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload ; 
}


exports.uploadsingleimage = (filename) => multerOptions().single(filename);

exports.uploadMixOfimages=(arrayOfFields)=> multerOptions().fields(arrayOfFields);
