const mongoose = require("mongoose");

const staff_token_Schema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    staff_email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    expiresIn: {
      type: Date,
      default: () => {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      },
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

const Staff_token = mongoose.model("Staff_token", staff_token_Schema);

module.exports = Staff_token;
