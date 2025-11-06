import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || import.meta.env.VITE_PORT;

export interface RegisterDto {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterDto) => {
  const res = await axios.post(`${API_BASE}/user/register`, data);
  return res.data;
};

export const loginUser = async (data: RegisterDto) => {
  const res = await axios.post(`${API_BASE}/user/login`, data);
  return res.data;
};

export const getProfile = async (token: string) => {
  const res = await axios.get(`${API_BASE}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
