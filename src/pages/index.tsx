import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import cookie from "cookie";
import axios from "axios";
import { UserProps } from "@/types/userProps";
import Layout from "@/components/Layout";
import { axiosInstance } from "@/utils/axiosInstance";
import { TravelProps } from "@/types/travelProps";

const inter = Inter({ subsets: ["latin"] });

interface HomePageProps {
  user: UserProps;
  travelData: TravelProps[];
}

export default function Home({ user, travelData }: HomePageProps) {
  return (
    <Layout user={user}>
      <div className="mt-10">
        <h1 className="font-bold text-3xl text-center">Popular Travels</h1>
        <div className="flex justify-between mt-10 mb-10">
          {travelData.map((travel) => (
            <div key={travel._id}>
              <div className="w-[300px] bg-white h-[250px] relative rounded-xl">
                <Image
                  src={travel.image}
                  alt={travel.title}
                  sizes=""
                  priority
                  fill
                  quality={100}
                  className="rounded-xl"
                />
              </div>
              <h1 className="text-xl font-semibold text-center mt-2">
                {travel.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.jwt;

  let user = null;
  let travelData: TravelProps[] = [];

  if (token) {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        headers: {
          Cookie: `jwt=${token}`,
        },
      });
      user = response.data.user;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  try {
    const travelResponse = await axiosInstance.get("/travels");
    travelData = travelResponse.data;

    travelData = travelData.sort(
      (a: TravelProps, b: TravelProps) => b.price - a.price
    );
    travelData = travelData.slice(0, 3);
  } catch (error) {
    console.error("Error fetching travel data:", error);
  }

  return {
    props: {
      user,
      travelData,
    },
  };
};
