const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: String,
  url: String,
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
