import React from "react";

export const Button = ({ children, ...props }) => (
  <button {...props} style={{ padding: "8px" }}>
    {children}
  </button>
);
