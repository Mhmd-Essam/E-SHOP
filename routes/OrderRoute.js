const express = require("express");
const authService = require("../services/authService");

const {
  createCashOrder,
  GetUserObject,
  getAllOrder,
  getspecificOrder,
  updateorderpay,
  updateorderDelivered,
  chechoutSession,
} = require("../services/OrderServices");

const router = express.Router();

router.get(
  "/checkout-session/:cartId",
  authService.protect,
  authService.allowedTO("user"),
  chechoutSession
);
router
  .route("/:cartId")
  .post(authService.protect, authService.allowedTO("user"), createCashOrder);
router
  .route("/")
  .get(
    authService.protect,
    authService.allowedTO("user", "admin", "manger"),
    GetUserObject,
    getAllOrder
  );

router
  .route("/:id")
  .get(
    authService.protect,
    authService.allowedTO("user", "admin", "manger"),
    getspecificOrder
  );

router
  .route("/:id/pay")
  .put(
    authService.protect,
    authService.allowedTO("admin", "manger"),
    updateorderpay
  );
router
  .route("/:id/deliver")
  .put(
    authService.protect,
    authService.allowedTO("admin", "manger"),
    updateorderDelivered
  );

module.exports = router;
