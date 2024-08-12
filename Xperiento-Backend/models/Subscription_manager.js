const mongoose = require("mongoose");

const subscription_manager_schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscriptions_History: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subscription",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Subscription_Manager = mongoose.model(
  "Subscription_Manager",
  subscription_manager_schema
);

module.exports = Subscription_Manager;
