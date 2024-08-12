const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "businesses",
    },
    category_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business_category",
    },
    title: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
