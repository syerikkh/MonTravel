import { axiosInstance } from "@/utils/axiosInstance";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "destinations",
    path: "/destinations",
  },
  {
    name: "tours",
    path: "/tours",
  },
  {
    name: "about",
    path: "/about",
  },
  {
    name: "blog",
    path: "/blog",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

export const Nav = ({ isAdmin }: { isAdmin: Boolean }) => {
  const pathname = usePathname();
  return (
    <div className="flex gap-8">
      {links.map((link, index) => (
        <Link
          href={link.path}
          key={index}
          className={`${
            link.path === pathname && "font-bold"
          } capitalize font-medium hover:text-white/60 transition-all`}
        >
          {link.name}
        </Link>
      ))}
      {isAdmin && (
        <Link
          href="/adminDashboard"
          className={`${
            pathname === "/adminDashboard" && "font-bold"
          } capitalize font-medium hover:text-white/60 transition-all`}
        >
          Admin Dashboard
        </Link>
      )}
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
