const mongoose = require("mongoose");

const branch_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
  },
});

const Branch = mongoose.model("businesses", branch_Schema);

module.exports = Branch;
