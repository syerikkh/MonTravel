import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import cookie from "cookie";
import axios from "axios";
import { UserProps } from "@/types/userProps";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ user }: UserProps) {
  return (
    <Layout user={user}>
      <div className="mt-10">
        <h1 className="font-bold text-3xl text-center">Popular Travels</h1>
        <div className="flex justify-between mt-10 mb-10">
          <div>
            <div className="w-[300px] bg-white h-[250px] relative">
              <Image
                src="/Travel.jpg"
                alt=""
                priority
                fill
                quality={100}
                className=""
              />
            </div>
            <h1 className="text-xl font-semibold text-center mt-2">Desert</h1>
          </div>
          <div>
            <div className="w-[300px] bg-white h-[250px] relative">
              <Image
                src="/Travel.jpg"
                alt=""
                priority
                fill
                quality={100}
                className=""
              />
            </div>
            <h1 className="text-xl font-semibold text-center mt-2">Desert</h1>
          </div>
          <div>
            <div className="w-[300px] bg-white h-[250px] relative">
              <Image
                src="/Travel.jpg"
                alt=""
                priority
                fill
                quality={100}
                className=""
              />
            </div>
            <h1 className="text-xl font-semibold text-center mt-2">Desert</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.jwt;

  if (!token) {
    return {
      props: {
        user: null,
      },
    };
  }
  try {
    const response = await axios.get("http://localhost:8000/user", {
      headers: {
        Cookie: `jwt=${token}`,
      },
    });

    const user = response.data.user;

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
