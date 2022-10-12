const express = require("express");

const { getCompany } = require("../controller/company");

const router = express.Router();

router.route("/").get(getCompany);

module.exports = router;
