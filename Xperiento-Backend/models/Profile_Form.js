const mongoose = require("mongoose");

const Profile_Form_Schema = new mongoose.Schema({
  form_type: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active,In-Active"],
  },
  forms: {
    type: Object,
  },
});

const Profile_Form = mongoose.model("Profile_Form", Profile_Form_Schema);

module.exports = Profile_Form;
