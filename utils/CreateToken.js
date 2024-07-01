const jwt = require("jsonwebtoken");

const createToken = (payload) =>
    jwt.sign({ userID: payload }, process.env.JWT_Secret_Key, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });
  
    module.exports=createToken ;

