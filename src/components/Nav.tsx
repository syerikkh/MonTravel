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

export const Nav = () => {
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
    </div>
  );
};
