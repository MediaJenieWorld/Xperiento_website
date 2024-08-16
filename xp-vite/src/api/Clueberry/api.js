import { handleRequest, instance } from "../Main_Api";

export const getFormsData = async () => {
  return handleRequest(() => instance.get("Clueberry/get_form"));
};

export const getProfilesData = async () => {
  return handleRequest(() => instance.get("Clueberry/get_profiles"));
};

export const createProfileHandler = async (data) => {
  return handleRequest(() => instance.post(`Clueberry/create_profile`, data));
};

export const fetch_Vehicle_Brand = async () => {
  return handleRequest(() => instance.get("Analytics/getVehicleBrands"));
};

export const fetch_getCars_Color = async () => {
  return handleRequest(() => instance.get("Analytics/getCars_Color"));
};

export const fetch_getAgeGroup = async () => {
  return handleRequest(() => instance.get("Analytics/getAgeGroup"));
};

export const fetch_VisitorInsight = async (data) => {
  return handleRequest(() =>
    instance.post("Analytics/get_Visitors_Profiles", data)
  );
};

export const getFiltered_VisitorsProfile = async (payload) => {
  return handleRequest(() =>
    instance.post(`Clueberry/getFiltered_VisitorsProfile`, payload)
  );
};
