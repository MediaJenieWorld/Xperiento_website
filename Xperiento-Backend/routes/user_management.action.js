const express = require("express");
const User = require("../models/User_Customer");
const router = express.Router();

router.get("/getDashboard_Profiles", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      business_Id: 1,
    });

    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }
    const usersProfiles = await User.find(
      {
        business_Id: user.business_Id,
      },
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
        role: 1,
        status: 1,
      }
    ).lean();

    res.status(200).json({ data: usersProfiles, success: true });
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

module.exports = router;
