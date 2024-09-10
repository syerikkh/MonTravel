import React from "react";
import { Nav } from "./Nav";
import Link from "next/link";
import { axiosInstance } from "@/utils/axiosInstance";
import { GetServerSideProps } from "next";

const paths = {};

export const Header = ({ isAdmin }: { isAdmin: Boolean }) => {
  return (
    <div className="flex justify-between items-center py-8">
      <div>Logo</div>
      <Nav isAdmin={isAdmin} />
      <div>
        <Link href="/signin">
          <button className="border-2 p-2 bg-white rounded-lg">Sign in</button>
        </Link>
      </div>
    </div>
  );
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
