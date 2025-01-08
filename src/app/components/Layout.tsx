import React from "react";
// COMPONENTS
import Navbar from "./Navbar";

interface LayoutType {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutType) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
