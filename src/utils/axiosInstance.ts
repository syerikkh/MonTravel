import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://travelbackend-clp4.onrender.com",
  withCredentials: true,
});
