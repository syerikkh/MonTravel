import React, { useState } from "react";
import { Nav } from "./Nav";
import Link from "next/link";
import { UserProps } from "@/types/userProps";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils/axiosInstance";

interface HeaderProps {
  user: UserProps;
}

export const Header = ({ user }: HeaderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/signout");
      console.log("past axios");
      setTimeout(() => {
        router.push("/");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error signing out:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center py-8">
      <div>Logo</div>
      <Nav user={user} />
      <div>
        {user ? (
          <button
            onClick={handleSignOut}
            className="border-2 p-2 text-black bg-white rounded-lg"
          >
            {loading ? "Signing out..." : "Sign out"}
          </button>
        ) : (
          <Link href="/signin">
            <button className="border-2 p-2 bg-white text-black rounded-lg">
              Sign in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
