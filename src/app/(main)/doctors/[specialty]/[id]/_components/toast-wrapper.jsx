"use client";

import { Toaster } from "sonner"; // or react-toastify
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function ToastWrapper({ children }) {
  return (
    <>
      <Toaster position="top-center" richColors /> {/* OR <ToastContainer /> */}
      {children}
    </>
  );
}
