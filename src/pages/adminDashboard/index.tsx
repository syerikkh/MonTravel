import CreateTours from "@/components/CreateTours";
import Layout from "@/components/Layout";
import { UserProps } from "@/types/userProps";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import cookie from "cookie";

interface AdminDashboardProps extends UserProps {
  user: UserProps;
  allUsers: [{ name: string; email: string }];
}

const AdminDashboard = ({ user, allUsers }: AdminDashboardProps) => {
  return (
    <Layout user={user}>
      <h1 className="text-3xl font-bold text-center my-4">Admin Dashboard</h1>
      <div className="flex justify-between mt-10">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold my-4">List of all users:</h2>
          <ul>
            {allUsers.map((user, index) => (
              <li key={index}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold my-4">Travel Data:</h2>
          <CreateTours />
        </div>
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
    const [userResponse, usersResponse] = await Promise.all([
      axios.get("http://localhost:8000/user", {
        headers: {
          Cookie: `jwt=${token}`,
        },
      }),
      axios.get("http://localhost:8000/adminDashboard", {
        headers: {
          Cookie: `jwt=${token}`,
        },
      }),
    ]);

    const user = userResponse.data.user;
    const allUsers = usersResponse.data;

    return {
      props: {
        user,
        allUsers,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
        allUsers: [],
      },
    };
  }
};

export default AdminDashboard;
