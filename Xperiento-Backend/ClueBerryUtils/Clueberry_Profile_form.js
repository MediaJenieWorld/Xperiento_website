const forms = {
  Restaurant: {
    "Fine Dining": {
      sections: [
        {
          title: "What they Order and their Preference?",
          register_key: "order",
          fields: [
            {
              label: "First Order?",
              register_key: "first_order",
              view_Type: "icon",
              field_Type: "select",
              values: [
                {
                  iconURL: "/assets/customer_Profile/pizza.png",
                  value: "pizza",
                  label: "Pizza",
                },
                {
                  iconURL: "/assets/customer_Profile/sushi.png",
                  value: "sushi",
                  label: "Sushi",
                },
                {
                  iconURL: "/assets/customer_Profile/burger.png",
                  value: "burger",
                  label: "Burger",
                },
              ],
            },
            {
              label: "Preferred Cuisine?",
              register_key: "preferred_cuisine",
              view_Type: "icon",
              field_Type: "select",
              values: [
                {
                  iconURL: "/assets/customer_Profile/italian.png",
                  value: "italian",
                  label: "Italian",
                },
                {
                  iconURL: "/assets/customer_Profile/japanese.png",
                  value: "japanese",
                  label: "Japanese",
                },
                {
                  iconURL: "/assets/customer_Profile/mexican.png",
                  value: "mexican",
                  label: "Mexican",
                },
              ],
            },
          ],
        },
        {
          title: "Dining Experience Feedback",
          register_key: "feedback",
          fields: [
            {
              label: "Satisfaction Level?",
              register_key: "satisfaction_level",
              view_Type: "icon",
              field_Type: "select",
              values: [
                {
                  iconURL: "/assets/customer_Profile/very_satisfied.png",
                  value: "very_satisfied",
                  label: "Very Satisfied",
                },
                {
                  iconURL: "/assets/customer_Profile/satisfied.png",
                  value: "satisfied",
                  label: "Satisfied",
                },
                {
                  iconURL: "/assets/customer_Profile/neutral.png",
                  value: "neutral",
                  label: "Neutral",
                },
                {
                  iconURL: "/assets/customer_Profile/dissatisfied.png",
                  value: "dissatisfied",
                  label: "Dissatisfied",
                },
                {
                  iconURL: "/assets/customer_Profile/very_dissatisfied.png",
                  value: "very_dissatisfied",
                  label: "Very Dissatisfied",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  Retail: {
    Clothing: {
      sections: [
        {
          title: "Style Preferences",
          register_key: "style_preferences",
          fields: [
            {
              label: "Favorite Style?",
              register_key: "favorite_style",
              view_Type: "icon",
              field_Type: "select",
              values: [
                {
                  iconURL: "/assets/customer_Profile/casual.png",
                  value: "casual",
                  label: "Casual",
                },
                {
                  iconURL: "/assets/customer_Profile/formal.png",
                  value: "formal",
                  label: "Formal",
                },
                {
                  iconURL: "/assets/customer_Profile/sporty.png",
                  value: "sporty",
                  label: "Sporty",
                },
              ],
            },
            {
              label: "Preferred Size?",
              register_key: "preferred_size",
              view_Type: "icon",
              field_Type: "select",
              values: [
                {
                  iconURL: "/assets/customer_Profile/small.png",
                  value: "small",
                  label: "Small",
                },
                {
                  iconURL: "/assets/customer_Profile/medium.png",
                  value: "medium",
                  label: "Medium",
                },
                {
                  iconURL: "/assets/customer_Profile/large.png",
                  value: "large",
                  label: "Large",
                },
              ],
            },
          ],
        },
        {
          title: "Shopping Habits",
          register_key: "shopping_habits",
          fields: [
            {
              label: "Frequency of Shopping?",
              register_key: "frequency_of_shopping",
              view_Type: "text",
              field_Type: "input",
            },
            {
              label: "Preferred Shopping Time?",
              register_key: "preferred_shopping_time",
              view_Type: "text",
              field_Type: "input",
            },
          ],
        },
      ],
    },
  },
  Fashion: {
    Apparel: {},
    Accessories: {},
    Footwear: {},
    Jewelry: {},
    Handbags: {},
  },
  Lifestyle: {
    Fitness: {},
    Travel: {},
    Beauty: {},
    "Home Decor": {},
    Outdoor: {},
  },
  Health: {
    Medical: {},
    "Fitness Centers": {},
    Nutrition: {},
    "Mental Health": {},
    Pharmacies: {},
  },
  Fintech: {
    Payments: {},
    Lending: {},
    Investments: {},
    Blockchain: {},
    Insurance: {},
  },
  Services: {
    Consulting: {},
    Cleaning: {},
    Legal: {},
    Marketing: {},
    "Event Planning": {},
  },
};

function getSectionsAndFields(organization, organization_SubCategory) {
  return (
    forms[`${organization}`][`${organization_SubCategory}`]?.sections || []
  );
}

module.exports = {
  forms,
  getSectionsAndFields,
};
