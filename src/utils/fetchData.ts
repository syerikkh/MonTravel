import { GetServerSidePropsContext } from "next";
import { axiosInstance } from "./axiosInstance";

export const fetchUsersData = async (context: GetServerSidePropsContext) => {
  try {
    const res = await axiosInstance.get("/users", {});
    return {
      props: {
        users: res.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        users: [],
      },
    };
  }
};
