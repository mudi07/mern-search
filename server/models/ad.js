const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Ad must have a company id"],
  },
  primaryText: String,
  headline: String,
  description: String,
  cta: String,
  imageUrl: String,
});

// To make an index for all text fields, so we can make search for it
// AdSchema.index({ "$**": "text" });

const Ad = mongoose.model("Ad", AdSchema);

module.exports = Ad;
