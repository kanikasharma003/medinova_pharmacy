import { Link } from "react-router-dom";
import { FaShieldAlt, FaTruck, FaLock, FaHeadset } from "react-icons/fa";
import "./Hero.css";

const TRUST_POINTS = [
  { icon: FaShieldAlt, label: "Genuine Medicines" },
  { icon: FaTruck, label: "Fast Delivery" },
  { icon: FaLock, label: "Secure Payments" },
  { icon: FaHeadset, label: "24/7 Support" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--1" />
        <span className="hero__blob hero__blob--2" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="badge badge-teal hero__badge">Trusted online pharmacy</span>
          <h1 className="hero__title">Your Health, Our Priority</h1>
          <p className="hero__sub">
            Trusted medicines and healthcare products delivered safely to your doorstep.
          </p>

          <div className="hero__actions">
            <Link to="/medicines" className="btn btn-primary">Shop Medicines</Link>
            <Link to="/categories" className="btn btn-outline">Explore Categories</Link>
          </div>

          <div className="hero__trust">
            {TRUST_POINTS.map((point) => (
              <div key={point.label} className="hero__trust-item">
                <point.icon />
                <span>{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__visual-card">
            <img
              src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800&auto=format&fit=crop"
              alt="Pharmacist preparing medicine order"
              loading="lazy"
            />
          </div>
          <div className="hero__float-card hero__float-card--top">
            <FaShieldAlt />
            <div>
              <strong>100% Genuine</strong>
              <span>Verified products</span>
            </div>
          </div>
          <div className="hero__float-card hero__float-card--bottom">
            <FaTruck />
            <div>
              <strong>Free Delivery</strong>
              <span>On orders above ₹499</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
