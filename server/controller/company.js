const Company = require("../models/company");

exports.addNewCompany = async (req, res, next) => {
  try {
    const { name, url } = req.body;

    const newCompany = await Company.create({ name, url });

    res.status(201).json({
      status: "success",
      message: "New ad created successfully",
      data: {
        newCompany,
      },
    });
  } catch (err) {
    console.error(`Error when creating and company: ${err.message}`);
    return res.status(400).json({
      status: "failed",
      message: "failed to create an new company",
    });
  }
};

exports.getCompany = async (req, res, next) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (err) {
    console.error(`Error when getting all company: ${err.message}`);
    return res.status(400).json({
      status: "failed",
      message: "failed to get all companies",
    });
  }
};
