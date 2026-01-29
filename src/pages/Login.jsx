import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/styles/login.css";
import logo from "../../media/vcetLogo.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save email in localStorage
    localStorage.setItem("ch_email", formData.email);

    // Redirect to student profile page
    navigate("/student/profile");
  };

  return (
    <div className="login-page">
      <div className="login-container">
      <div className="login-section">
        <h1 className="login-heading">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox-row">
            <div className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label>Remember me</label>
            </div>

            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="create-account">
            New user?{" "}
            <Link to="/signup" className="create-account-link">
              Create an account
            </Link>
          </div>
        </form>
      </div>

      <div className="welcome-section">
        <div className="logo-placeholder">
          <img src={logo} alt="CampusHireHub Logo" />
        </div>

        <div className="welcome-greeting">Hello there,</div>
        <div className="welcome-message">Welcome back</div>
      </div>
      </div>
    </div>
  );
};

export default Login;
