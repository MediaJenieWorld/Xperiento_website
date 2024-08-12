const default_customer_form = {
  _id: "1",
  title: "a title",
  register_key: "form",
  sections: [
    {
      title: "Basic Information",
      register_key: "Basic",
      fields: [
        {
          label: "Gender",
          register_key: "gender",
          view_Type: "icon",
          field_Type: "select",
          values: [
            {
              iconURL: "/assets/customer_Profile/man.png",
              value: "male",
              label: "Male",
            },
            {
              iconURL: "/assets/customer_Profile/woman.png",
              value: "female",
              label: "Female",
            },
          ],
        },
        {
          label: "Age",
          register_key: "age",
          view_Type: "icon",
          field_Type: "select",
          values: [
            {
              iconURL: "",
              value: "15-20",
              label: "15-20",
            },
            {
              iconURL: "",
              value: "20-25",
              label: "20-25",
            },
          ],
        },
      ],
    },
    {
      title: "How Do they Travel?",
      register_key: "travel",
      fields: [
        {
          label: "Vehicle Type",
          view_Type: "icon",
          field_Type: "select",
          register_key: "vehicle_type",
          values: [
            {
              iconURL: "/assets/customer_Profile/car.png",
              value: "Car",
              label: "Car",
            },
            {
              iconURL: "/assets/customer_Profile/bike.png",
              value: "Bike",
              label: "Bike",
            },
            {
              iconURL: "/assets/customer_Profile/train.png",
              value: "train",
              label: "Train",
            },
            {
              iconURL: "/assets/customer_Profile/taxi.png",
              value: "Taxi",
              label: "Taxi",
            },
            {
              iconURL: "/assets/customer_Profile/question.png",
              value: "etc",
              label: "etc",
            },
          ],
        },
        {
          label: "Vehicle Brand",
          view_Type: "icon",
          field_Type: "select",
          register_key: "vehicle_brand",
          values: [
            {
              iconURL: "/assets/customer_Profile/bmw.png",
              value: "bmw",
              label: "BMW",
            },
            {
              iconURL: "/assets/customer_Profile/benz.png",
              value: "ercedes",
              label: "Mercedes",
            },
            {
              iconURL: "/assets/customer_Profile/audi.png",
              value: "audi",
              label: "Audi",
            },
            {
              iconURL: "/assets/customer_Profile/jaguar.png",
              value: "jaguar",
              label: "Jaguar",
            },
            {
              iconURL: "/assets/customer_Profile/question.png",
              value: "etc",
              label: "etc",
            },
          ],
        },
        {
          label: "Vehicle Model",
          register_key: "vehicle_model",
          view_Type: "label",
          field_Type: "input",
        },
      ],
    },
    {
      title: "General Information",
      register_key: "general_info",
      fields: [
        {
          label: "Full Name",
          register_key: "full_name",
          view_Type: "label",
          field_Type: "input",
        },
        {
          label: "Phone Number",
          register_key: "phone_number",
          view_Type: "label",
          field_Type: "input",
        },
        {
          label: "Email Address",
          register_key: "email",
          view_Type: "label",
          field_Type: "input",
        },
        {
          label: "Address",
          register_key: "address",
          view_Type: "label",
          field_Type: "input",
        },
        {
          label: "State",
          register_key: "state",
          view_Type: "label",
          field_Type: "input",
        },
        {
          label: "City",
          register_key: "city",
          view_Type: "label",
          field_Type: "input",
        },
      ],
    },
  ],
};

module.exports = default_customer_form;
