import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCapsules } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.password) errs.password = "Password is required.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length > 0) return;

    const result = login(form);
    if (!result.success) {
      setFormError(result.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-card__logo">
          <span>
            <FaCapsules />
          </span>
          MediNova
        </Link>

        <h1>Welcome back</h1>
        <p className="auth-card__sub">Login to continue to your account.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="auth-input">
              <FaEnvelope />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "field-error" : ""}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <span className="field-error-text">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="auth-input field-password">
              <FaLock />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className={errors.password ? "field-error" : ""}
                placeholder="Enter your password"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="field-error-text">{errors.password}</span>}
          </div>

          <label className="auth-remember">
            <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
            Remember me
          </label>

          {formError && <p className="auth-card__form-error">{formError}</p>}

          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>

        <p className="auth-card__footer">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
