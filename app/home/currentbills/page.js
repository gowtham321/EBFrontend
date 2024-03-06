"use client";
import { React, useState, useEffect } from "react";
import Bill from "../../components/Bills";
// import Nav from '../Nav/page'
// import './style.css';
import { fetcher } from "@/app/services/baseServices";
import Loading from "@/app/components/loading";
import { Result, message } from "antd";

const CurrentBills = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [billData, setbillData] = useState(null);

  const loadData = () => {
    fetcher({ endPoint: "User/CurrentBills", method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setbillData(data);
      });
  };

  useEffect(() => {
    loadData();
    console.log(billData);
  }, []);

  if (billData == null) return <Loading />;

  if (billData.length == 0) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Result title="All bills have been paid" />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-2 flex flex-col space-y-2 overflow-y-auto">
      {contextHolder}
      <h2>Outstanding bills</h2>
      {billData &&
        billData.map((bill) => (
          <Bill bill={bill} messageApi={messageApi} loadData={loadData} />
        ))}
    </div>
  );
};

export default CurrentBills;
