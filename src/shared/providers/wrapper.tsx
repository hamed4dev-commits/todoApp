import React from "react";
import { ToastContainer } from "react-toastify";
import AuthInitializer from "./AuthInitializer";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthInitializer />

      {children}

      <ToastContainer />
    </>
  );
};

export default wrapper;
