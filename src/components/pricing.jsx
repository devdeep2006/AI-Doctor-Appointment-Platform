"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { PricingTable } from "@clerk/nextjs";

const Pricing = () => {
  return (
    <Card className="border border-blue-100 bg-pink-50 backdrop-blur-md shadow-md rounded-2xl">
      <CardContent className="p-6 md:p-8">
        <PricingTable
          checkoutProps={{
            appearance: {
              theme: "light",
              elements: {
                drawerRoot: {
                  zIndex: 2000,
                  backgroundColor: "#ffffff",
                },
                headerTitle: {
                  color: "#0ea5e9",
                },
                button: {
                  backgroundColor: "#60a5fa", // Lightish blue
                  color: "#ffffff",
                  fontWeight: "bold",
                  borderRadius: "8px",
                },
                buttonHover: {
                  backgroundColor: "#3b82f6", // Slightly darker blue for hover
                },
                body: {
                  color: "#1e293b",
                },
              },
            },
          }}
/>

      </CardContent>
    </Card>
  );
};

export default Pricing;
