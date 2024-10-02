import React from "react";
import { UserProps } from "@/types/userProps";
import { Header } from "./Header";

interface LayoutProps extends UserProps {
  children: React.ReactNode;
}

const Layout = ({ user, children }: LayoutProps) => {
  return (
    <div>
      <Header user={user} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
