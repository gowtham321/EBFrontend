"use client";
import { React, useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetcher } from "../services/baseServices";

const data = [
  {
    name: "Page A",
    uv: 1000,
  },
  {
    name: "Page B",
    uv: 2000,
  },
  {
    name: "Page C",
    uv: 4000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

const data2 = [
  {
    name: "Page A",
    uv: 1000,
  },
  {
    name: "Page B",
    uv: 2000,
  },
  {
    name: "Page C",
    uv: 4000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

export default function Graph() {
  const [graphData, setgraphData] = useState([]);
  useEffect(() => {
    fetcher({ endPoint: "User/GraphData", method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setgraphData(data);
      });
  }, []);

  //   render() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      <AreaChart
        width={500}
        height={400}
        data={data2}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8834d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
  //   }
}
