import {
  KIONYX_BASE_URL,
  VERSION,
  USER,
  LOGIN,
  SIGN_UP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "./constants";
import axios from "axios";

const instance = axios.create({});

instance.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
      config.headers.userId = userId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function loginOperation(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = KIONYX_BASE_URL + VERSION + USER + LOGIN;
      const CONFIG = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(URL, payload, CONFIG);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function signUpOperation(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = KIONYX_BASE_URL + VERSION + USER + SIGN_UP;
      const CONFIG = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(URL, payload, CONFIG);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function forgotPasswordOperation(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = KIONYX_BASE_URL + VERSION + USER + FORGOT_PASSWORD;
      const CONFIG = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(URL, payload, CONFIG);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function resetPasswordOperation(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = KIONYX_BASE_URL + VERSION + USER + RESET_PASSWORD;
      const CONFIG = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(URL, payload, CONFIG);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
