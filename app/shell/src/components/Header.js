import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <header style={styles.header}>
      <h3>Welcome, {user ? user?.name?.toUpperCase() : "Guest"}</h3>

      <nav>
        <button onClick={() => navigate("/")}>Dashboard</button>
        <button onClick={() => navigate("/form")}>New Form</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    padding: "12px 20px",
    background: "#1f2937",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
