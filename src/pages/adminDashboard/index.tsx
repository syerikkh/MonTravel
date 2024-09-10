import React from "react";
import { GetServerSideProps } from "next";
import { axiosInstance } from "@/utils/axiosInstance";

const AdminDashboard = ({ isAdmin }: { isAdmin: Boolean }) => {
  return <div>Hello Admin dashboard</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axiosInstance.get("/users");
    return {
      props: {
        isAdmin: res.data.isAdmin,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        isAdmin: false,
      },
    };
  }
};

export default AdminDashboard;
