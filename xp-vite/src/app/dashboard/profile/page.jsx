import { useEffect, useState } from "react";
import "./styles.scss";
import { viewProfile_Api } from "@/api/Main_Api";
import { formatDate } from "@/utils/timeFormatter";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  async function get_UserDataHandler() {
    setLoading(true)
    try {
      const res = await viewProfile_Api()
      if (res.data.success || res.status == 200) {
        setUser(res.data.data)
      }
    } catch (error) {
      console.log(error.error);
    }
    setLoading(false)
  }

  useEffect(() => {
    get_UserDataHandler()
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
    organization = "",
    organization_SubCategory = "",
    industrySegment = "",
    active_subscription = { startTime: "", endTime: "", plan: "", price: "" }
  } = user || {};
  const startTime = formatDate(active_subscription.startTime)
  const endTime = formatDate(active_subscription.endTime)
  return (
    <div className="User-Profile-Page">
      <Link to="update" className="button start">Update Profile</Link>  <h3>
        <span>{`${firstName} ${lastName}`}</span>,<br /> Welcome to the Profile information!
      </h3>
      <div className="user-details">
        <h2 style={{ textAlign: "center", padding: "1rem" }}>Active Subscription Plan</h2>
        {
          active_subscription ?
            <>
              <div className="row">
                <label>Subscription Plan:</label>
                <span>{active_subscription.plan}</span>
              </div>
              <div className="row">
                <label>Subscription Price:</label>
                <span>Rs. {active_subscription.price}</span>
              </div>
              <div className="row">
                <label>Subscription Start At:</label>
                <span>{startTime}</span>
              </div>
              <div className="row">
                <label>Subscription End On:</label>
                <span style={{ color: '#e74c3c' }}>{endTime}</span>
              </div>
            </>
            : <p style={{ textAlign: "center", margin: "1rem 0" }}>You dont have any Subscription Plan</p>
        }
        <hr />
        <div className="row">
          <label>First Name:</label>
          <span>{firstName}</span>
        </div>
        <div className="row">
          <label>Last Name:</label>
          <span>{lastName}</span>
        </div>
        <div className="row">
          <label>Email:</label>
          <span>{email}</span>
        </div>
        <div className="row">
          <label>Phone Number:</label>
          <span>{phoneNumber}</span>
        </div>
        <div className="row">
          <label>Status:</label>
          <span>{status}</span>
        </div>
        <div className="row">
          <label>Country:</label>
          <span>{country}</span>
        </div>
        <div className="row">
          <label>State:</label>
          <span>{state}</span>
        </div>
        <div className="row">
          <label>City:</label>
          <span>{city}</span>
        </div>
        <div className="row">
          <label>Pin Code:</label>
          <span>{pinCode}</span>
        </div>
        <div className="row">
          <label>Organization:</label>
          <span>{organization}</span>
        </div>
        <div className="row">
          <label>Organization SubCategory:</label>
          <span>{organization_SubCategory}</span>
        </div>
        <div className="row">
          <label>industrySegment:</label>
          <span>{industrySegment}</span>
        </div>
        <hr />

      </div>
    </div>
  );
};

export default UserProfilePage;
