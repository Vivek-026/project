// src/components/ui/Card.jsx
import React from "react";

const Card = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

export { Card, CardContent };
