import axios from "axios";
import { server_base_Url } from "@/utils/temp_tokenKey";
import Cookies from "universal-cookie";
import { cookiesKey } from "@/store/User_Context";

const instance = axios.create({
  baseURL: server_base_Url,
  timeout: 60000,
});

instance.interceptors.request.use(
  async function (config) {
    try {
      config.headers["Content-Type"] = "application/json";
      config.headers.Accept = "application/json";
      const cookies = new Cookies();
      const token = cookies.get(cookiesKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("error ==> ", error.message);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const handleRequest = async (request) => {
  let res;
  try {
    res = await request();
    return res;
  } catch (error) {
    console.error("error ==> ", error.message);

    const statusCode = error.response ? error.response.status : 500; // Default to 500 if no status code is available
    const responseData = error.response ? error.response.data : null; // Get the response data if available

    const errorMessage =
      responseData && responseData.data ? responseData.data : "Server Error";

    return {
      status: statusCode,
      data: {
        message: errorMessage, // Use the extracted message
        data: errorMessage, // Use the extracted message
        success: false,
        extra: responseData, // Include the full response data if needed
      },
    };
  }
};

export const login = async (data) => {
  return handleRequest(() => instance.post("auth/login", data));
};

export const getCategoryAndSubCategories = async (data) => {
  return handleRequest(() =>
    instance.get("get/CategoryAndSubCategories", data)
  );
};

export const signUp = async (data) => {
  return handleRequest(() => instance.post("auth/createAccount", data));
};

export const forgotPasswordEmailSend = async (body) => {
  return handleRequest(() => instance.post(`auth/forgotpassword`, body));
};

export const sendCodeToEmailHandler = async (body) => {
  return handleRequest(() => instance.post(`auth/sendCodeToEmail`, body));
};

export const confirmVerifyEmailHandler = async (body) => {
  return handleRequest(() => instance.post(`auth/confirmVerifyEmail`, body));
};

export const forgotPasswordEmailVerify = async (body) => {
  return handleRequest(() =>
    instance.post(`auth/forgotpassword/${body.token}`, body)
  );
};

export const createPaymentOrder = async ({ pack }) => {
  return handleRequest(() => instance.post(`subscription/payment`, { pack }));
};
export const viewProfile_Api = async () => {
  return handleRequest(() => instance.get("Zensight/users/profile"));
};

export const activateFreeTrail_Api = async () => {
  return handleRequest(() => instance.get(`subscription/free_trail`));
};

export const verifyPaymentApi = async ({ orderId }) => {
  return handleRequest(() =>
    instance.post(`subscription/verifyPayment`, { orderId })
  );
};

export { handleRequest, instance };
