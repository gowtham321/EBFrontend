import React from "react";
import SocialCard from "../components/socialCard";

export default function Home() {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-col w-full justify-start items-start p-2">
        <SocialCard />
      </div>
    </div>
  );
}
