import React from "react";
import { Nav } from "./Nav";
import Link from "next/link";

const paths = {};

export const Header = () => {
  return (
    <div className="flex justify-between items-center py-8">
      <div>Logo</div>
      <Nav />
      <div>
        <Link href="/signin">
          <button className="border-2 p-2 bg-white rounded-lg">Sign in</button>
        </Link>
      </div>
    </div>
  );
};
