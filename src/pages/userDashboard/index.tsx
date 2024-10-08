import Layout from "@/components/Layout";
import { UserProps } from "@/types/userProps";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import cookie from "cookie";
import axios from "axios";
import { TravelProps } from "@/types/travelProps";
import { axiosInstance } from "@/utils/axiosInstance";

interface DashboardProps {
  user: UserProps;
  cartData: TravelProps[];
}

const UserDashboard = ({ user, cartData }: DashboardProps) => {
  const [cart, setCart] = useState(cartData);
  const deleteCart = async (travelRouteId: string) => {
    try {
      const response = await axiosInstance.post("/user/deleteTravel", {
        travelRouteId,
      });
      if (response.status === 200) {
        setCart(cart.filter((travel) => travel._id !== travelRouteId));
        console.log("Successfully deleted your cart");
      }
    } catch (error: any) {
      console.log(
        "Error while deleting cart:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <Layout user={user}>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Your Cart</h2>
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cart.map((travel) => (
              <div
                key={travel._id}
                className="relative p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => deleteCart(travel._id)}
                  className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                >
                  X
                </button>
                <h3 className="text-xl font-semibold text-gray-800">
                  {travel.title}
                </h3>
                <p className="text-gray-600 mt-2">{travel.description}</p>
                {travel.image && (
                  <img
                    src={travel.image}
                    alt={travel.title}
                    className="mt-4 w-full h-40 object-cover rounded-lg"
                  />
                )}
                {travel.price && (
                  <p className="text-gray-600 mt-4">
                    {travel.price.toLocaleString()}₮
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-600">Your cart is empty</p>
        )}
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
    const [userResponse, cartResponse] = await Promise.all([
      axios.get("https://travelbackend-clp4.onrender.com/user", {
        headers: {
          Cookie: `jwt=${token}`,
          withCredentials: true,
        },
      }),
      axios.get("https://travelbackend-clp4.onrender.com/user/cart", {
        headers: {
          Cookie: `jwt=${token}`,
          withCredentials: true,
        },
      }),
    ]);
    const user = userResponse.data.user;
    const cart = cartResponse.data.cart;
    return {
      props: {
        user,
        cartData: cart,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
        cartData: [],
      },
    };
  }
};

export default UserDashboard;
