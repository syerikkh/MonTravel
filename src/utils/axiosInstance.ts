import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://travelbackend-h4iy.onrender.com",
  withCredentials: true,
});
