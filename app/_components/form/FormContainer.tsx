import React from "react";

const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full px-6 py-2 md:px-10 md:py-0">{children}</div>;
};

export default FormContainer;
