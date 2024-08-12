const mongoose = require("mongoose");

// Define the user schema
const verify_user_Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    industrySegment: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    organization_SubCategory: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    isBranchExists: {
      type: Boolean,
    },
    branchCode: {
      type: String,
    },
    category_Id: {
      type: String,
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

const Verify_User = mongoose.model("Verify_User", verify_user_Schema);

module.exports = Verify_User;
