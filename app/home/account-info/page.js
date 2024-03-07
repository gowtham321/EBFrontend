"use client";
import { React, useState, useEffect } from "react";
import Userinfo from "../../components/Userinfo";
import { fetcher } from "@/app/services/baseServices";
import Loading from "@/app/components/loading";
// import {button}
function AccountInfo() {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    fetcher({ endPoint: "User/get-details", method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setuserData(data);
        console.log(data);
      });
  }, []);

  if (userData == null) return <Loading />;

  return (
    <div className="w-full h-full p-2 flex flex-col justify-center items-center space-y-2 overflow-y-auto">
      <center>
        <h2>Account-info</h2>
      </center>
      <Userinfo userData={userData} />
    </div>
  );
}

export default AccountInfo;
