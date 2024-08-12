const express = require("express");
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    res.send("Test");
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

module.exports = router;
