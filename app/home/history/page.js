"use client";

import { React, useState, useEffect } from "react";
import Bill from "../../components/Bills";
import { fetcher } from "@/app/services/baseServices";
import Loading from "@/app/components/loading";
import { Result } from "antd";
import Graph from "@/app/components/graph";

const History = () => {
  const [billData, setbillData] = useState(null);

  useEffect(() => {
    fetcher({ endPoint: "User/historyBills", method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setbillData(data);
        console.log("billData = " + billData);
      })
      .catch((err) => console.log(err));
  }, []);

  if (billData == null) return <Loading />;

  if (billData == []) return <div>jadsflkajd</div>;

  return (
    <div className="w-full h-full p-2 flex flex-col space-y-2">
      {/* <Graph /> */}
      <div className="w-full h-full flex flex-col overflow-y-auto">
        <h2>Previous bills</h2>
        {billData &&
          billData.map((bill) => <Bill bill={bill} isCurrent={false} />)}
      </div>
    </div>
  );
};

export default History;
