import React from "react";
import { Nav } from "./Nav";

const paths = {};

export const Header = () => {
  return (
    <div className="flex justify-between items-center py-8">
      <div>Logo</div>
      <Nav />
      <div>
        <button className="border-2 p-2 bg-white rounded-lg">Sign in</button>
      </div>
    </div>
  );
};
