const express = require("express");
const authService = require("../services/authService");

const router = express.Router();
const {
  addAddresses,
  getLoggedUserAddresses,
  removeAdresses
} = require("../services/addressesServices");

router.use(authService.protect, authService.allowedTO("user"));

router.route('/').post(addAddresses).get(getLoggedUserAddresses);

router.delete('/:addressesId',   removeAdresses
);

module.exports = router;
