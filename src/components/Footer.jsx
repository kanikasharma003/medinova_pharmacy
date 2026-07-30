import { Link } from "react-router-dom";
import { FaCapsules, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import categories from "../data/categories.js";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon">
              <FaCapsules />
            </span>
            MediNova
          </Link>
          <p>
            MediNova is your trusted online pharmacy — genuine medicines and healthcare products
            delivered safely to your doorstep, backed by expert support.
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/medicines">Medicines</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Categories</h4>
          <ul>
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link to={`/medicines?category=${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Customer Support</h4>
          <ul>
            <li><Link to="/contact">Help Center</Link></li>
            <li><Link to="/contact">Track Order</Link></li>
            <li><Link to="/contact">Returns &amp; Refunds</Link></li>
            <li><Link to="/contact">Privacy Policy</Link></li>
            <li><Link to="/contact">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} MediNova Pharmacy. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
