import { GetServerSideProps } from "next";
import { axiosInstance } from "@/utils/axiosInstance";
import { TravelProps } from "@/types/travelProps";
import Layout from "@/components/Layout";
import { ParsedUrlQuery } from "querystring";
import cookie from "cookie";
import { UserProps } from "@/types/userProps";
import axios from "axios";

interface TravelDetailProps {
  user: UserProps;
  travel: TravelProps;
}
interface Params extends ParsedUrlQuery {
  id: string;
}

const TravelDetail = ({ travel, user }: TravelDetailProps) => {
  return (
    <Layout user={user}>
      <div className="flex flex-col items-center mt-10 mb-10 min-h-screen p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            {travel.image && (
              <img
                src={travel.image}
                alt={travel.title}
                className="w-full h-96 object-cover"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-3xl font-bold text-white">{travel.title}</h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4">{travel.description}</p>
            {travel.price && (
              <p className="text-2xl font-semibold text-gray-800">
                {travel.price.toLocaleString()}₮
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, params } = context;
  const { id } = params as Params;
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.jwt;

  try {
    const travelResponse = await axiosInstance.get(`/travel/${id}`);
    const travel = travelResponse.data;

    let user = null;
    if (token) {
      const userResponse = await axios.get(
        "https://travelbackend-9tta.onrender.com/user",
        {
          headers: {
            Cookie: `jwt=${token}`,
          },
          withCredentials: true,
        }
      );
      user = userResponse.data.user;
    }
    return {
      props: {
        travel,
        user,
      },
    };
  } catch (error) {
    console.error("Error fetching travel details:", error);
    return {
      notFound: true,
    };
  }
};

export default TravelDetail;
