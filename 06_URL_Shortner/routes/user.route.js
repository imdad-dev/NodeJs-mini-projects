const express = require("express");

const router = express.Router();
const {userSignup} = require("../controller/user.controller.js")

router.post("/" , userSignup);
// router.post("/login" , userLogin);

module.exports = router; 