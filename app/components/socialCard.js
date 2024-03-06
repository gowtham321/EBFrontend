import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Masonry from "@mui/lab/Masonry";

const heights = [
  150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

export default function SocialCard() {
  return (
    <Box sx={{ width: "100%", minHeight: 393 }}>
      <Masonry columns={4} spacing={2}>
        {heights.map((height, index) => (
          <Card variant="outlined" key={index} sx={{ height }}>
            <div className="w-full h-full flex justify-center items-center">
              {index + 1}
            </div>
          </Card>
        ))}
      </Masonry>
    </Box>
  );
}
