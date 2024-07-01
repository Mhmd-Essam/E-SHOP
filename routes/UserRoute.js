const express = require("express");
const userServise = require("../services/userServise");
const userValidator = require("../utils/validatrors/UserValidator");
const authService = require("../services/authService");

const router = express.Router();

router.get(
  "/getMe",
  authService.protect,
  userServise.getLogedUserData,
  userServise.getUser
);
router.put(
  "/changeMyPassword",
  authService.protect,
  userServise.updateloggeduserPassword
);
router.put(
  "/UpdateMe",
  authService.protect,
  userValidator.updateloggedUserValidator,
  userServise.updateloggeduserDate
);
router.delete("/deleteMe", authService.protect, userServise.deleteloggedUser);

router.put("/ReactiveMe",userServise.activateloggedUser);

router.use(authService.protect, authService.allowedTO("admin", "manger"));

router
  .route("/")
  .get(userServise.getUsers)
  .post(
    userServise.uploadUserIMG,
    userServise.resizeImage,
    userValidator.createUserValidator,
    userServise.createUser
  );

router
  .route("/:id")
  .get(userServise.getUser)
  .put(
    userServise.uploadUserIMG,
    userServise.resizeImage,
    userValidator.updateUserValidator,
    userServise.updateUser
  )
  .delete(userServise.deleteUser);

router
  .route("/ChangePassword/:id")
  .put(
    userValidator.ChangeUserPasswordValidator,
    userServise.changeUserPassword
  );

module.exports = router;
