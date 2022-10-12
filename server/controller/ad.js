const Ad = require("../models/ad");
exports.addNewAd = async (req, res, next) => {
  try {
    const { companyId, primaryText, headline, description, cta, imageUrl } =
      req.body;
    const newAd = await Ad.create({
      companyId,
      primaryText,
      headline,
      description,
      cta,
      imageUrl,
    });
    res.status(201).json({
      status: "success",
      message: "New ad created successfully",
      data: {
        newAd,
      },
    });
  } catch (err) {
    console.error(`Error when creating and ad: ${err.message}`);
    return res.status(400).json({
      status: "failed",
      message: "failed to create an new ad",
    });
  }
};
exports.getAds = async (req, res, next) => {
  try {
    const { keywords } = req.query;
    const keywordToSearch = new RegExp(keywords, "ig");
    const adsMatchingKeyword = await Ad.find({
      $or: [
        { primaryText: { $regex: keywordToSearch } },
        { headline: { $regex: keywordToSearch } },
        { description: { $regex: keywordToSearch } },
      ],
    }).populate("companyId");
    res.status(200).json({
      status: "success",
      message: "Data matching with keywords",
      data: {
        keywords,
        ads: adsMatchingKeyword,
      },
    });
  } catch (err) {
    console.error(`Error when searching an ad: ${err.message}`);
    return res.status(400).json({
      status: "failed",
      message: "failed to create an new ad",
    });
  }
};
