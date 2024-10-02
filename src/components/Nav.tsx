import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { UserProps } from "@/types/userProps";

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

export const Nav = ({ user }: UserProps) => {
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
      {user && (
        <Link
          href={user.isAdmin ? "/adminDashboard" : "/userDashboard"}
          className={`${
            (user.isAdmin ? "/adminDashboard" : "/userDashboard") ===
              pathname && "font-bold"
          } capitalize font-medium hover:text-white/60 transition-all`}
        >
          {user.isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </Link>
      )}
    </div>
  );
};
