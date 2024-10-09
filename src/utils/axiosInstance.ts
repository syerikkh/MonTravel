import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://travelbackend-9tta.onrender.com",
  withCredentials: true,
});
