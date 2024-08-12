const User = require("../models/User_Customer");

const check_Active_Subscription = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId, {
    active_subscription: 1,
  })
    .populate({
      path: "active_subscription",
      select: "endTime plan price startTime",
    })
    .lean();

  if (!user) {
    return res.status(200).json({ data: "User not found", success: false });
  }

  if (!user?.active_subscription) {
    return res
      .status(200)
      .json({ data: "Subscription not found", success: false });
  }

  const isVaildSubs = checkSubscription(
    user.active_subscription.startTime,
    user.active_subscription.endTime
  );
  if (!isVaildSubs) {
    res.status(200).json({
      data: "Access denied. Subscription has expired.",
      success: false,
    });
  } else {
    req.active_subscription = user.active_subscription;
    next();
  }
};

const checkSubscription = (startDate, endDate) => {
  const currentDate = new Date();
  const subscriptionStartDate = new Date(startDate);
  const subscriptionEndDate = new Date(endDate);
  let isValidSubs;

  currentDate.setHours(0, 0, 0, 0);
  subscriptionStartDate.setHours(0, 0, 0, 0);
  subscriptionEndDate.setHours(0, 0, 0, 0);

  if (
    currentDate >= subscriptionStartDate &&
    currentDate <= subscriptionEndDate
  ) {
    isValidSubs = true;
  } else {
    isValidSubs = false;
  }
  return isValidSubs;
};

module.exports = check_Active_Subscription;
