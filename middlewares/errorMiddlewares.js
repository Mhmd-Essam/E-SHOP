const ApiError = require("../utils/apiError");

const handleJwtInvalidSignature = () =>
  new ApiError("Invalid token, please login again..", 401);

const handlejwtexpired = () =>
  new ApiError("expired token, please login again..", 401);


const globalError = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-use-before-define
    sendErrorforDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature();
    if (err.name === "TokenExpiredError") err = handlejwtexpired();

    // eslint-disable-next-line no-use-before-define
    sendErrorforProd(err, res);
  }
   if (err.name === "TokenExpiredError") err = handlejwtexpired();
};

const sendErrorforDev = (err, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorforProd = (err, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = globalError;
