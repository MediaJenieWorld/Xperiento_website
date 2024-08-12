const mongoose = require("mongoose");

const subscription_Schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscriptionManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription_Manager",
      required: true,
    },
    plan: {
      type: String,
    },
    price: {
      type: Number,
    },
    discount: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    endTime: {
      type: Date,
      required: true,
      default: function () {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 30 days from current time
      },
    },
    startTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscription_Schema);

module.exports = Subscription;
