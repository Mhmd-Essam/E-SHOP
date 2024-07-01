const express = require("express");
const {
  addProuductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  removeCart,
  UpdateCartItemQuantity,
  applyCoupon
} = require("../services/CartServices");

const authService = require("../services/authService");

const router = express.Router();
router.use(authService.protect, authService.allowedTO("user"));
router.route("/").get(getLoggedUserCart).post(addProuductToCart).delete(removeCart);

router.route("/:itemId").put(UpdateCartItemQuantity).delete(removeSpecificCartItem); 

router.patch('/applyCoupon',applyCoupon); 



module.exports = router;

