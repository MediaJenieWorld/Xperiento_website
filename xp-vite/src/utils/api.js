import axios from "axios";
import { server_base_Url } from "./temp_tokenKey";
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
  try {
    return await request();
  } catch (error) {
    console.error("error ==> ", error.message);
    return { data: { data: error.message || "Server Error", success: false } };
  }
};

export const login = async (data) => {
  return handleRequest(() => instance.post("auth/login", data));
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

export const activateFreeTrail_Api = async () => {
  return handleRequest(() => instance.get(`subscription/free_trail`));
};

export const verifyPaymentApi = async ({ orderId }) => {
  return handleRequest(() =>
    instance.post(`subscription/verifyPayment`, { orderId })
  );
};
