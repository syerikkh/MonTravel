import { GetServerSideProps } from "next";
import { axiosInstance } from "@/utils/axiosInstance";
import cookie from "cookie";
import axios from "axios";
import { TravelProps } from "@/types/travelProps";
import { UserProps } from "@/types/userProps";
import Layout from "@/components/Layout";

interface PageProps extends UserProps {
  userData: UserProps;
  travelData: TravelProps[];
}

const Travels = ({ userData, travelData }: PageProps) => {
  console.log("userdata", userData);
  return (
    <Layout user={userData}>
      <div className="flex flex-col items-center mt-10 min-h-screen p-4">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Travels</h2>
        {travelData.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {travelData.map((travel) => (
              <div
                key={travel._id}
                className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
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
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                    Add to cart
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
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-600">No travel data available</p>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.jwt;

  try {
    const travelResponse = await axiosInstance.get("/travels");
    const travelData = travelResponse.data;

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
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        travelData: [],
        userData: null,
      },
    };
  }
};

export default Travels;
