const Profile_Form = require("../models/Profile_Form");

const get_form = async ({ isOnlyBasicForm, user }) => {
  const { category_Id } = user;
  const form = await Profile_Form.find({ status: "Active" });
  const basicCustomerProfileForm = form.find(
    (val, i) => val.form_type === "Basic"
  );
  const getCategoryBased = form.find((val, i) => val.form_type === "Specific");

  const basicForm = basicCustomerProfileForm.forms.sections;
  const specificForm = getCategoryBased.forms;

  const getCategoryBasedSections = getSectionsAndFields({
    forms: specificForm,
    category_Id,
  });
  let combine = [];
  if (isOnlyBasicForm === "Basic") {
    basicForm[0].fields.length = 5;
    combine = {
      sections: [...basicForm],
    };
  } else {
    combine = {
      sections: [...basicForm, ...getCategoryBasedSections],
    };
  }

  return combine;
};

function getSectionsAndFields({ forms, category_Id }) {
  const { category, subCategory } = category_Id;
  return forms[`${category}`][`${subCategory}`]?.sections || [];
}
module.exports = { get_form };
