import React from "react";

interface UserProps {
  users: [
    {
      _id: string;
      name: string;
      email: string;
      password: string;
      isAdmin: boolean;
    }
  ];
}

const AdminDashboard = () => {
  return <div>Hello Admin dashboard USers: </div>;
};

export default AdminDashboard;
