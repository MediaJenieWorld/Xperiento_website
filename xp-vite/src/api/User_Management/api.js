import { handleRequest, instance } from "../Main_Api";

export const getUser_Management_Dashboard_Profiles = async () => {
  return handleRequest(() =>
    instance.get("User_Management/getDashboard_Profiles")
  );
};

export const getStaffDetailsHandler = async (id) => {
  return handleRequest(() =>
    instance.get(`User_Management/staff-profile/${id}`)
  );
};

export const updateStaffDetailsHandler = async (payload) => {
  return handleRequest(() =>
    instance.post(`User_Management/update-staff-profile/`, payload)
  );
};

export const generateAddStaffTokenHandler = async (payload) => {
  return handleRequest(() =>
    instance.post(`User_Management/generateAddStaffToken`, payload)
  );
};
