import React from "react";
import { Button } from "sharedUI/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={() => navigate("/form")}>New</Button>
    </div>
  );
};

export default Dashboard;

