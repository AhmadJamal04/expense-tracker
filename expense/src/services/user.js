import axios from "axios";
import conf from "../../config";

export const login = async (email, password) => {
  const response = await axios.post(`${conf.baseUrl}/api/users/login`, {
    email,
    password,
  });

  return response;
};

export const signup = async (name, email, password) => {
  const response = await axios.post(`${conf.baseUrl}/api/users/signup`, {
    name,
    email,
    password,
  });
  return response;
};

export const logout = async () => {
  const response = await axios.get(`${conf.baseUrl}/api/users/logout`);
  return response;
};

export const getUser = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.get(`${conf.baseUrl}/api/users/me`, config);
  return response;
};
