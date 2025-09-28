import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = async (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export const login = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const forgotPassword = async (data) => {
  return axios.post(`${API_URL}/forgot-password`, data);
};

export const resetPassword = async (token, data) => {
  return axios.post(`${API_URL}/reset-password/${token}`, data);
};
