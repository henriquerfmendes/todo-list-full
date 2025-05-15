import React from "react";

interface PageTitleProps {
  children?: React.ReactNode;
}

function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="text-center text-5xl font-extrabold text-white mb-8 font-mono">
      Task Manager
      {children}
    </h1>
  );
}

export default PageTitle;
