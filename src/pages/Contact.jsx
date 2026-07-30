import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaHeadset, FaPaperPlane } from "react-icons/fa";
import "./Contact.css";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) errs.phone = "Enter a valid 10-digit phone number.";
    if (!form.message.trim()) errs.message = "Please enter a message.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Hook this up to a form backend (Formspree, EmailJS, etc.) when deploying.
      setSent(true);
      setForm(initialForm);
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">Contact Us</p>
          <h1 className="section-title">We're here to help</h1>
          <p className="section-sub">
            Have a question about an order, a product, or your prescription? Reach out — our team
            typically responds within a few hours.
          </p>
        </div>

        <div className="contact-page__grid">
          <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "field-error" : ""}
                placeholder="Your full name"
              />
              {errors.name && <span className="field-error-text">{errors.name}</span>}
            </div>

            <div className="contact-page__row">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "field-error" : ""}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="field-error-text">{errors.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "field-error" : ""}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className={errors.message ? "field-error" : ""}
                placeholder="How can we help?"
              />
              {errors.message && <span className="field-error-text">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary">
              <FaPaperPlane /> {sent ? "Message Sent!" : "Send Message"}
            </button>
            {sent && <p className="contact-page__success">Thanks for reaching out — we'll be in touch soon.</p>}
          </form>

          <div className="contact-page__info">
            <div className="contact-page__info-item">
              <FaMapMarkerAlt />
              <div>
                <h4>Address</h4>
                <p>MediNova Pharmacy, Sector 18, Noida, Uttar Pradesh, India</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <FaPhoneAlt />
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <FaEnvelope />
              <div>
                <h4>Email</h4>
                <p>support@medinova.com</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <FaHeadset />
              <div>
                <h4>Customer Support</h4>
                <p>Available 24/7 for order and product queries</p>
              </div>
            </div>

            <div className="contact-page__map" role="img" aria-label="Map placeholder showing MediNova's location">
              <span>Map placeholder — embed Google Maps here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
