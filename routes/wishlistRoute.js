const express = require("express");
const authService = require("../services/authService");

const router = express.Router();
const {
  addProductToWishList,
  removeProductFromWishlist,
  getLoggedUserWishlist
} = require("../services/wishlistservise");

router.use(authService.protect, authService.allowedTO("user"));

router.route('/').post(addProductToWishList).get(getLoggedUserWishlist);

router.delete('/:productId', removeProductFromWishlist);

module.exports = router;


