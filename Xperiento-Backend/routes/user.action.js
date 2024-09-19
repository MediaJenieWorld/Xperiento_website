const express = require("express");
const router = express.Router();
const User = require("../models/User_Customer");
const Insight = require("../models/Insights_model");
const mongoose = require("mongoose");
// Get all users
router.get("/", async (req, res) => {
  try {
    // const users = await User.find().lean().exec();
    res.json({ data: "GET ALL USERS", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId, {
      firstName: 1,
      lastName: 1,
      email: 1,
      phoneNumber: 1,
      status: 1,
      country: 1,
      state: 1,
      city: 1,
      pinCode: 1,
      organization: 1,
      organization_SubCategory: 1,
      category_Id: 1,
      business_Id: 1,
      active_subscription: 1,
    })
      .populate([
        {
          path: "active_subscription",
          select: "endTime plan price startTime",
        },
        {
          path: "category_Id",
        },
        {
          path: "business_Id",
        },
      ])
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ data: user, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

router.get("/counts", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId, { todo: 1, liked: 1 }).lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const todoLength = user.todo.length;
    const likedLength = user.liked.length;
    res.status(200).json({
      message: "User's todoLength and liked Insights",
      todoLength,
      likedLength,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

router.get("/myTodos", async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId, { todo: 1 })
      .populate({ path: "todo" })
      .exec();
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ data: user.todo, success: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

router.get("/myImpletements", async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId, { implement: 1 })
      .populate({ path: "implement" })
      .exec();
    // console.log("User", user);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ data: user.implement, success: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

router.delete("/deleteUser/:staff_Id", async (req, res) => {
  try {
    const userId = req.user._id;
    const staff_Id = req.params.staff_Id;

    const adminUser = await User.findById(userId, {
      business_Id: 1,
      role: 1,
    }).lean();
    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ data: "Only available for admin.", success: false });
    }

    if (!mongoose.Types.ObjectId.isValid(staff_Id)) {
      return res
        .status(400)
        .json({ data: "Staff ID is not valid", success: false });
    }
    const staffObjectId = new mongoose.Types.ObjectId(staff_Id);

    console.log("staff id", staffObjectId);
    console.log("business_Id ", adminUser.business_Id);
    const staffMember = await User.findOne({
      _id: staffObjectId,
      business_Id: adminUser.business_Id,
      role: "staff",
    });

    if (!staffMember) {
      return res.status(404).json({ data: "Staff not found", success: false });
    }

    const deleteResult = await User.deleteOne({ _id: staffMember._id });

    return res.status(200).json({
      data: "Deleted successfully",
      success: true,
      extra: deleteResult,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ data: "Internal server error", success: false });
  }
});

module.exports = router;
