const express = require("express");
const router = express.Router();
const Profiles = require("../models/Profile");
const User = require("../models/User_Customer");
const Profile_Form = require("../models/Profile_Form");

const visitorProfileFilters = [
  "travel_By",
  "vehicle_brand",
  "visited_with",
  "like tea/coffee",
  "language_spoken",
  "visited_with",
];

router.get("/getVehicleBrands", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      category_Id: 1,
      business_Id: 1,
      role: "admin",
    });
    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }
    const categories = await Profiles.aggregate([
      {
        $match: {
          business_Id: user.business_Id,
          category_Id: user.category_Id,
        },
      },
      {
        $group: {
          _id: "$data.vehicle_brand", // Group by the vehicle_brand field
          count: { $sum: 1 }, // Count the occurrences
        },
      },
      {
        $match: {
          _id: {
            $in: [
              "toyota",
              "tesla",
              "honda",
              "ford",
              "hyundai",
              "ram",
              "bmw",
              "kia",
            ],
          }, // Filter for specific vehicle brands
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the output
          Vehicle_Brand: "$_id", // Rename _id to Vehicle_Brand
          count: 1, // Include the count field
        },
      },
    ]);

    res.status(200).json({ data: categories, success: true });
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

router.get("/getCars_Color", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      category_Id: 1,
      business_Id: 1,
      role: "admin",
    });
    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }
    const categories = await Profiles.aggregate([
      {
        $match: {
          business_Id: user.business_Id,
          category_Id: user.category_Id,
          "data.travel_By": "Car",
        },
      },
      {
        $group: {
          _id: {
            color: "$data.color",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          color: "$_id.color",
          counts: "$count",
        },
      },
    ]);

    res.status(200).json({ data: categories, success: true });
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

router.get("/getAgeGroup", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      category_Id: 1,
      business_Id: 1,
      role: "admin",
    });

    const categories = await Profiles.aggregate([
      {
        $match: {
          business_Id: user.business_Id,
          category_Id: user.category_Id,
          "data.travel_By": "Car",
        },
      },
      {
        $group: {
          _id: "$data.age_group",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          age_group: "$_id",
          counts: "$count",
        },
      },
    ]);

    res.status(200).json({ data: categories, success: true });
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

router.get("/get_Filters_Of_Visitors_Profiles", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      role: "admin",
    });
    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }
    const filter_response = await Profile_Form.findOne({ form_type: "Basic" });
    const getReqFilters = filter_response.forms.sections[0].fields.filter(
      (val) => visitorProfileFilters.includes(val.register_key)
    );
    const getAllFilters = getReqFilters.map((obj, index) => {
      let reqObj = {};
      reqObj.label = obj.label;
      reqObj.register_key = obj.register_key;
      const reqFields = obj.values.map((val, i) => {
        const field = {};
        field.label = val.label;
        field.value = val.value;
        return field;
      });
      reqObj.values = reqFields;
      return reqObj;
    });
    res.status(200).json({ data: getAllFilters, success: true });
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

router.post("/get_Visitors_Profiles", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      category_Id: 1,
      business_Id: 1,
      role: "admin",
    }).lean();
    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }

    // GET Filters from Body
    const data = req.body;

    const categories = await Profiles.aggregate([
      {
        $match: {
          business_Id: user.business_Id,
          category_Id: user.category_Id,
        },
      },
      {
        $group: {
          _id: {
            gender: "$data.gender",
            age_group: "$data.age_group",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.gender",
          age_groups: {
            $push: {
              age_group: "$_id.age_group",
              count: "$count",
            },
          },
          total_count: { $sum: "$count" },
        },
      },
      {
        $project: {
          gender: "$_id",
          age_groups: 1,
          total_count: 1,
          _id: 0,
        },
      },
    ]);

    const filter_response = await Profile_Form.findOne({ form_type: "Basic" });
    const getReqFilters = filter_response.forms.sections[0].fields.filter(
      (val) => visitorProfileFilters.includes(val.register_key)
    );
    const getAllFilters = generateFiltersAndFields(getReqFilters);
    res
      .status(200)
      .json({ data: categories, filters: getAllFilters, success: true });
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

router.post("/get_Acitve_Filtered_Visitors_Profiles", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, {
      _id: 1,
      category_Id: 1,
      business_Id: 1,
      role: "admin",
    }).lean();
    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }

    // GET Filters from Body
    const data = req.body;

    const filters = filterNonEmptyProperties(data);
    const categories = await Profiles.aggregate([
      {
        $match: {
          business_Id: user.business_Id,
          category_Id: user.category_Id,
          ...filters,
        },
      },
      {
        $group: {
          _id: {
            gender: "$data.gender",
            age_group: "$data.age_group",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.gender",
          age_groups: {
            $push: {
              age_group: "$_id.age_group",
              count: "$count",
            },
          },
          total_count: { $sum: "$count" },
        },
      },
      {
        $project: {
          gender: "$_id",
          age_groups: 1,
          total_count: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json({ data: categories, success: true });
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

function filterNonEmptyProperties(originalObj) {
  const newObj = {};

  for (const key in originalObj) {
    if (originalObj[key] !== "") {
      newObj[`data.${key}`] = originalObj[key];
    }
  }

  return newObj;
}

function generateFiltersAndFields(arr) {
  return arr.map((obj) => {
    let reqObj = {};
    reqObj.label = obj.label;
    reqObj.register_key = obj.register_key;
    if (obj?.childrens) {
      reqObj.childrens = obj.childrens;
    }
    const reqFields = obj.values.map((val, i) => {
      const field = {};
      field.label = val.label;
      field.value = val.value;
      if (val?.children) {
        field.children = val.children;
      }
      return field;
    });
    reqObj.values = reqFields;
    return reqObj;
  });
}

module.exports = router;
