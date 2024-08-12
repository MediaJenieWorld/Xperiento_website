const Subscription = require("../models/Subscription");
const Subscription_Manager = require("../models/Subscription_manager");
const User = require("../models/User_Customer");
const { subscriptionPacks } = require("./sub_packs");

async function add_Subscription(paymentArr, user) {
  try {
    let paymentObj;
    if (paymentArr.length > 0) {
      const x = paymentArr.find(
        (order, i) => order.payment_status == "SUCCESS"
      );
      if (x) {
        paymentObj = x;
      } else {
        throw new Error("Successfull Payment Not Found");
      }
    }

    const findPack = subscriptionPacks.find(
      (order, i) => order.price === paymentObj.order_amount
    );

    const newSubscription = new Subscription({
      author: user._id,
      subscriptionManager: user.subscription_Manager,
      plan: findPack.name,
      price: paymentObj.order_amount,
      transactionId: paymentObj.cf_payment_id,
      discount: `${paymentObj?.order_amount - paymentObj?.payment_amount}`,
      endTime: new Date(Date.now() + findPack.days * 24 * 60 * 60 * 1000),
    });

    await newSubscription.save();
    await Subscription_Manager.updateOne(
      { _id: user.subscription_Manager },
      {
        $push: {
          subscriptions_History: newSubscription,
        },
      }
    );

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          active_subscription: newSubscription,
        },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

async function add_freeTrail_Subscription(user) {
  try {
    const findPack = subscriptionPacks.find((order, i) => order.price === 0);

    const newSubscription = new Subscription({
      author: user._id,
      subscriptionManager: user.subscription_Manager,
      plan: findPack.name,
      price: findPack.price,
      transactionId: "Free Trail",
      discount: "0",
      endTime: new Date(Date.now() + findPack.days * 24 * 60 * 60 * 1000),
    });

    await newSubscription.save();
    await Subscription_Manager.updateOne(
      { _id: user.subscription_Manager },
      {
        $push: {
          subscriptions_History: newSubscription,
        },
      }
    );

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          active_subscription: newSubscription,
        },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { add_Subscription, add_freeTrail_Subscription };
