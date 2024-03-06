import React from "react";
import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}

export default Loading;
