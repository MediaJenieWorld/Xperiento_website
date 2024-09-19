import { useEffect, useState } from "react";
import "./styles.scss";
import { viewProfile_Api } from "@/api/Main_Api";
import { formatDate } from "@/utils/timeFormatter";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await viewProfile_Api();
        if (res.data.success || res.status === 200) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard">
        <h1>Error: User not authenticated!</h1>
      </div>
    );
  }

  const {
    firstName = "",
    lastName = "",
    email = "",
    phoneNumber = "",
    status = "",
    country = "",
    state = "",
    city = "",
    pinCode = "",
    business_Id = "location",
    category_Id: { category = "category", subCategory = "subCategory" } = {},
    active_subscription: { startTime = "", endTime = "", plan = "", price = "" } = {},
  } = user;

  const startTime_ui = formatDate(startTime);
  const endTime_ui = formatDate(endTime);

  const renderDetailRow = (label, value = label) => (
    <div className="row">
      <label>{label}:</label>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="User-Profile-Page">
      <Link to="update" className="button start">Edit Profile</Link>
      <h3>Welcome, <span>{`${firstName} ${lastName}`}</span></h3>
      <div className="user-details">
        <h2 style={{ textAlign: "center", padding: "1rem" }}>Active Subscription Plan</h2>
        {plan ? (
          <>
            {renderDetailRow("Subscription Plan", plan)}
            {renderDetailRow("Subscription Price", `Rs. ${price}`)}
            {renderDetailRow("Subscription Start At", startTime_ui)}
            {renderDetailRow("Subscription End On", <span style={{ color: "#e74c3c" }}>{endTime_ui}</span>)}
          </>
        ) : (
          <p style={{ textAlign: "center", margin: "1rem 0" }}>You don't have any Subscription Plan</p>
        )}
        <hr />
        {renderDetailRow("First Name", firstName)}
        {renderDetailRow("Last Name", lastName)}
        {renderDetailRow("Email", email)}
        {renderDetailRow("Phone Number", phoneNumber)}
        {renderDetailRow("Status", status)}
        {renderDetailRow("Country", country)}
        {renderDetailRow("State", state)}
        {renderDetailRow("City", city)}
        {renderDetailRow("Pin Code", pinCode)}
        {renderDetailRow("Organization", category)}
        {renderDetailRow("Organization SubCategory", subCategory)}
        {renderDetailRow("Location", business_Id?.location)}
        <hr />
      </div>
    </div>
  );
};

export default UserProfilePage;
