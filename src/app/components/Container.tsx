import React from "react";

interface IContainer {
  children: React.ReactNode;
}

export default function Container({ children }: IContainer) {
  return <div className="container px-4 mx-auto">{children}</div>;
}
