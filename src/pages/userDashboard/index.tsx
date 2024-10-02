import Layout from "@/components/Layout";
import { UserProps } from "@/types/userProps";
import { GetServerSideProps } from "next";
import React from "react";
import cookie from "cookie";
import axios from "axios";

const UserDashboard = ({ user }: UserProps) => {
  return (
    <Layout user={user}>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.jwt;

  if (!token) {
    res.writeHead(302, { Location: "/signin" });
    res.end();
    return { props: {} };
  }

  try {
    const userResponse = await axios.get("http://localhost:8000/user", {
      headers: {
        Cookie: `jwt=${token}`,
      },
    });
    const user = userResponse.data.user;
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
      },
    };
  }
};

export default UserDashboard;
