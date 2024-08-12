import { handleRequest, instance } from "../Main_Api";

export const getDashboardCounts = async () => {
  return handleRequest(() => instance.get("Zensight/users/counts"));
};

export const getActionsList = async () => {
  return handleRequest(() => instance.get(`Zensight/users/myTodos`));
};

export const getImplements = async () => {
  return handleRequest(() => instance.get(`Zensight/users/myImpletements`));
};

export const getDashboard = async () => {
  return handleRequest(() => instance.get("Zensight/insights/counts"));
};

export const getInsights = async (query) => {
  return handleRequest(() => instance.get("Zensight/insights?" + query));
};

export const createInsightsPost = async (formData) => {
  return handleRequest(() => instance.post("Zensight/insights", formData));
};

export const getSingleInsights = async (id) => {
  return handleRequest(() =>
    instance.post("Zensight/insights/getInsight", { id })
  );
};

export const likeHandler = async (id) => {
  return handleRequest(() => instance.post(`Zensight/insights/${id}/like`));
};

export const bookmarksHandler = async (id) => {
  return handleRequest(() =>
    instance.post(`Zensight/insights/${id}/bookmarks`)
  );
};

export const save_Unsave_Implement_Handler = async (id) => {
  return handleRequest(() =>
    instance.post(`Zensight/insights/${id}/implement/add`)
  );
};

export const giveStarsHandler = async ({ id, stars }) => {
  return handleRequest(() =>
    instance.post(`Zensight/insights/${id}/implement/stars`, { stars })
  );
};

export const dislikeHandler = async (id) => {
  return handleRequest(() => instance.post(`Zensight/insights/${id}/dislike`));
};

export const createComment = async ({ id, text }) => {
  return handleRequest(() =>
    instance.post(`Zensight/insights/${id}/comments`, { text })
  );
};

export const delete_Staff_Account = async ({ id }) => {
  return handleRequest(() =>
    instance.delete(`Zensight/users/deleteUser/${id}`)
  );
};
