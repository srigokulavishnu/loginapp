import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to PopX</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
      <button className="primary" onClick={() => navigate("/register")}>
        Create Account
      </button>
      <button className="secondary" onClick={() => navigate("/login")}>
        Already Registered? Login
      </button>
    </div>
  );
}
