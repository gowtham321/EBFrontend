"use client";

import { React, useState, useLayoutEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";

function HomeRootLayout({ children }) {
  const [user, setuser] = useState(0);
  const router = useRouter();

  useLayoutEffect(() => {
    if (window) {
      setuser(sessionStorage.getItem("accessToken"));
    }
  }, []);

  if (user == 0) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return user ? (
    <div className="flex flex-row w-full h-full">
      <Sidebar />
      {children}
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="font-mono">
        <span className="font-mono pr-2">
          Oops! you haven't logged in yet, please
        </span>
        <Button
          onClick={(e) => {
            router.push("/login");
          }}
          variant="contained"
        >
          login
        </Button>
        <span className="font-mono pl-2">to view the content</span>
      </div>
    </div>
  );
}

export default HomeRootLayout;
