const express = require("express");
const User = require("../models/User_Customer");
const router = express.Router();
const mongoose = require("mongoose");
const BusinessCategory = require("../models/BusinessCategory");
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

router.get("/staff-profile/:id", async (req, res) => {
  try {
    const userId = req.user._id;

    const getId = req.params.id;
    const isVaildId = mongoose.Types.ObjectId.isValid(getId);

    if (!isVaildId) {
      return res.status(200).json({
        data: `Staff with this id ${getId} not found`,
        success: false,
      });
    }
    const user = await User.findOne(
      { _id: userId, role: "admin" },
      { _id: 1 }
    ).lean();

    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

    const getStaff = await User.findOne(
      { _id: req.params.id },
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
        status: 1,
        country: 1,
        state: 1,
        city: 1,
        role: 1,
        pinCode: 1,
        business_Id: 1,
        category_Id: 1,
      }
    )
      .populate([
        { path: "business_Id", select: "name" },
        { path: "category_Id" },
      ])
      .lean();

    if (!getStaff) {
      return res.status(200).json({
        data: `Staff with this id ${getId} not found`,
        success: false,
      });
    }
    res.json({ data: getStaff, success: true });
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

// Update Staff Details API

router.post("/update-staff-profile", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne(
      { _id: userId, role: "admin" },
      { _id: 1, business_Id: 1 }
    ).lean();

    if (!user) {
      return res.status(200).json({ data: "User not found", success: false });
    }

    const {
      staff_id,
      firstName,
      lastName,
      phoneNumber,
      country,
      state,
      city,
      organization_SubCategory,
      organization,
      pinCode,
    } = req.body;
    const getStaff = await User.findOne(
      { _id: staff_id, business_Id: user.business_Id, role: "staff" },
      {
        firstName: 1,
        lastName: 1,
        phoneNumber: 1,
        category_Id: 1,
        country: 1,
        state: 1,
        pinCode: 1,
        city: 1,
      }
    )
      .populate("category_Id")
      .lean();

    if (!getStaff) {
      return res.status(200).json({
        data: `Staff with this id ${getId} not found`,
        success: false,
      });
    }
    const checkCategory =
      organization === getStaff.category_Id.category &&
      organization_SubCategory === getStaff.category_Id.subCategory
        ? true
        : false;

    let newCategory_id;
    if (!checkCategory) {
      find_category = await BusinessCategory.findOne({
        category: organization,
        subCategory: organization_SubCategory,
      }).lean();

      if (!find_category) {
        return res.status(200).json({
          success: false,
          data: "Invaild Organization or Sub Category!",
        });
      }
      newCategory_id = find_category._id;
    }

    let updatesFields = {
      firstName,
      lastName,
      country,
      state,
      city,
      pinCode,
    };

    if (!checkCategory) {
      updatesFields.category_Id = newCategory_id;
    }
    if (phoneNumber !== getStaff.phoneNumber) {
      updatesFields.phoneNumber = find_category.phoneNumber;
    }

    // if (find_category !== getStaff.category_Id) {
    //   updatesFields.category_Id = find_category._id;
    // }

    const updateStaff = await User.updateOne(
      { _id: getStaff._id },
      {
        $set: { ...updatesFields },
      },
      { new: true }
    );

    return res.json({ data: updateStaff, success: true });
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

module.exports = router;
