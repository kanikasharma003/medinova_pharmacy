import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaCapsules } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import "./Auth.css";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) errs.phone = "Enter a valid 10-digit phone number.";
    if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length > 0) return;

    const result = register(form);
    if (!result.success) {
      setFormError(result.message);
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate("/login"), 1400);
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

        <h1>Create your account</h1>
        <p className="auth-card__sub">Sign up to start ordering medicines and healthcare products.</p>

        {success ? (
          <p className="auth-card__success">Account created! Redirecting you to login...</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <div className="auth-input">
                <FaUser />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? "field-error" : ""}
                  placeholder="Your full name"
                />
              </div>
              {errors.fullName && <span className="field-error-text">{errors.fullName}</span>}
            </div>

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
              <label htmlFor="phone">Phone Number</label>
              <div className="auth-input">
                <FaPhone />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "field-error" : ""}
                  placeholder="10-digit mobile number"
                />
              </div>
              {errors.phone && <span className="field-error-text">{errors.phone}</span>}
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
                  placeholder="At least 6 characters"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="field-error-text">{errors.password}</span>}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="auth-input">
                <FaLock />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "field-error" : ""}
                  placeholder="Re-enter your password"
                />
              </div>
              {errors.confirmPassword && <span className="field-error-text">{errors.confirmPassword}</span>}
            </div>

            {formError && <p className="auth-card__form-error">{formError}</p>}

            <button type="submit" className="btn btn-primary btn-block">Create Account</button>
          </form>
        )}

        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
