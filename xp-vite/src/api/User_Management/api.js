import { handleRequest, instance } from "../Main_Api";

export const getUser_Management_Dashboard_Profiles = async () => {
  return handleRequest(() =>
    instance.get("User_Management/getDashboard_Profiles")
  );
};
