const express = require("express");
const {GenerateShortURL ,redirectURL ,handleAnalyticesURL} = require("../controller/url.controller.js");


const router = express.Router();

router.post("/" , GenerateShortURL);
router.get("/:shortId" , redirectURL);
router.get("/analytices/:shortId" , handleAnalyticesURL);

module.exports = router;

