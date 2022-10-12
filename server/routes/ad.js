const express = require("express");

const { getAds, addNewAd } = require("../controller/ad");

const router = express.Router();

router.route("/").get(getAds).post(addNewAd);

module.exports = router;
