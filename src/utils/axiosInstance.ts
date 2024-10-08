import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://travelbackend-qoc8.onrender.com",
  withCredentials: true,
});
