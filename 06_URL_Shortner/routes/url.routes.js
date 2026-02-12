const express = require("express");
const {GenerateShortURL ,redirectNewURL ,handleAnalyticesURL} = require("../controller/url.controller.js");


const router = express.Router();

router.post("/" , GenerateShortURL);
router.get("/:shortId" , redirectNewURL);
router.get("/analytices/:shortId" , handleAnalyticesURL);

module.exports = router;

