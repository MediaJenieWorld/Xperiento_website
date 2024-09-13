const express = require("express");
const router = express.Router();
const User = require("../models/User_Customer");
const Profile = require("../models/Profile");
const mongoose = require("mongoose");
const { get_form } = require("../ClueBerryUtils/GetForm");

const allowedFilters = [
  "full_name",
  "age_group",
  "gender",
  "travel_By",
  "vehicle_brand",
];

router.get("/get_form", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      category_Id: 1,
      // customer_create_profile_form: 1
    })
      .populate("category_Id")
      .lean();

    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }

    const combine = await get_form({ isOnlyBasicForm: "All", user });

    res.status(200).json({
      data: { customer_create_profile_form: combine },
      success: true,
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ data: error.message, success: false });
  }
});

router.get("/get_profiles", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      profiles: 1,
      category_Id: 1,
    })
      .populate(["profiles", "category_Id"])
      .lean();

    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }
    const combine = await get_form({ isOnlyBasicForm: "Basic", user });

    res.status(200).json({
      data: { ...user, customer_create_profile_form: combine },
      success: true,
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ data: error.message, success: false });
  }
});

router.post("/create_profile", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      business_Id: 1,
      category_Id: 1,
    });

    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }

    const payload = req.body;
    const id = new mongoose.Types.ObjectId();
    console.log("/create_profile");

    const newProfile = new Profile({
      author: user._id,
      business_Id: user.business_Id,
      category_Id: user.category_Id,
      title: `${id}`,
      data: payload,
    });
    await newProfile.save();
    await User.findByIdAndUpdate(user._id, {
      $push: { profiles: newProfile._id },
    });

    res.status(200).json({ data: newProfile, success: true });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ data: error.message, success: false });
  }
});

router.post("/getFiltered_CustomerProfile", async (req, res) => {
  try {
    const user_id = req.user;
    const filters = filterPayload(req.body);
    const user = await User.findById(user_id, {
      _id: 1,
      profiles: 1,
      // category_Id: 1,
    })
      .populate([
        { path: "profiles", match: { ...filters } },
        // { path: "category_Id" },
      ])
      .lean();

    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }
    res.status(200).json({
      data: user.profiles,
      success: true,
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ data: error.message, success: false });
  }
});

function filterPayload(obj) {
  let x = {};
  for (let key in obj) {
    if (obj[key] !== "" || allowedFilters.includes(key)) {
      x[`data.${key}`] = { $regex: obj[key], $options: "i" };
    }
  }
  return x;
}

module.exports = router;
