const mongoose = require("mongoose");

const BusinessCategorySchema = new mongoose.Schema({
  category: { type: String, requried: true },
  icon: { type: String, default: "" },
  subCategory: { type: String, requried: true },
});

const BusinessCategory = mongoose.model(
  "business_category",
  BusinessCategorySchema
);

module.exports = BusinessCategory;
