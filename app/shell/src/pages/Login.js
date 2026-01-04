import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { FAKE_TOKEN, PASSWORD, USERNAME } from "../constants/constants";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Fake API
    if (username === USERNAME && password === PASSWORD) {
      dispatch(
        loginSuccess({
          user: { name: username },
          token: FAKE_TOKEN,
        })
      );

      navigate("/", { replace: true });
    } else {
      setErrorMessage("Invalid credentials!");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
      {<p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
