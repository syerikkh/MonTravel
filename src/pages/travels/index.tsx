import { GetServerSideProps } from "next";
import { axiosInstance } from "@/utils/axiosInstance";
import cookie from "cookie";
import axios from "axios";
import { TravelProps } from "@/types/travelProps";
import { UserProps } from "@/types/userProps";
import Layout from "@/components/Layout";
import { useState } from "react";
import Toast from "@/components/Toast";
import { useRouter } from "next/router";
import Link from "next/link";

interface PageProps extends UserProps {
  userData: UserProps;
  travelData: TravelProps[];
  totalPages: number;
  currentPage: number;
}

const Travels = ({
  userData,
  travelData,
  totalPages,
  currentPage,
}: PageProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const addToCart = async (travelRouteId: string) => {
    if (!userData) {
      router.push("/signin");
      return;
    }
    setLoading(travelRouteId);
    setMessage("");
    try {
      const response = await axiosInstance.post("/user/addTravelRoute", {
        travelRouteId,
      });
      if (response.status === 200) {
        setMessage("Successfully added to your cart");
      }
    } catch (error: any) {
      console.log(
        "Error while adding to cart:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(null);
    }
  };
  const handlePageChange = (page: number) => {
    router.push(`/travels?page=${page}`);
  };
  return (
    <Layout user={userData}>
      <div className="flex flex-col items-center mt-10 mb-10 min-h-screen p-4">
        <h2 className="mb-4 text-3xl font-bold ">Travels</h2>
        {message && <Toast message={message} onClose={() => setMessage("")} />}
        {travelData.length > 0 ? (
          <>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {travelData.map((travel) => (
                <Link key={travel._id} href={`/travels/${travel._id}`}>
                  <div className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
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
                    <div className="flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(travel._id);
                        }}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                      >
                        {loading === travel._id
                          ? "Adding to cart"
                          : "Add to cart"}
                      </button>
                      {travel.price ? (
                        <p className="text-gray-600 mt-4">
                          {travel.price.toLocaleString()}₮
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="mt-4 text-gray-600">No travel data available</p>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.jwt;
  const page = parseInt(query.page as string) || 1;
  const limit = 3;

  try {
    const travelResponse = await axiosInstance.get(
      `/getTravelWithLimit?page=${page}&limit=${limit}`
    );
    const { routes: travelData, totalPages, currentPage } = travelResponse.data;

    let userData = null;
    if (token) {
      const userResponse = await axios.get("http://localhost:8000/user", {
        headers: {
          Cookie: `jwt=${token}`,
        },
      });
      userData = userResponse.data.user;
    }

    return {
      props: {
        travelData,
        userData,
        totalPages,
        currentPage,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        travelData: [],
        userData: null,
        totalPages: 0,
        currentPage: 1,
      },
    };
  }
};

export default Travels;
