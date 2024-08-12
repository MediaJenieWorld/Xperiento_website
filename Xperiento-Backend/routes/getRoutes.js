const express = require("express");
const BusinessCategory = require("../models/BusinessCategory");
const router = express.Router();

router.get("/CategoryAndSubCategories", async (req, res) => {
  try {
    const categories = await getCategoriesWithSubcategories();
    res.status(200).json({ data: categories, success: true });
  } catch (error) {
    console.error(error?.message);
    res.status(500).json({
      data: error.message || "Server Error",
      success: false,
    });
  }
});

module.exports = router;

async function getCategoriesWithSubcategories() {
  try {
    const results = await BusinessCategory.aggregate([
      {
        $group: {
          _id: "$category",
          icon: { $addToSet: "$icon" },
          subCategories: { $addToSet: "$subCategory" },
        },
      },
    ]);
    return results;
  } catch (error) {
    console.error("Error fetching categories with subcategories:", error);
  }
}
