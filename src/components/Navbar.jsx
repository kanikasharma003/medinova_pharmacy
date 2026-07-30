import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCapsules,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Medicines", to: "/medicines" },
  { label: "Categories", to: "/categories" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <span className="navbar__logo-icon">
            <FaCapsules />
          </span>
          MediNova
        </Link>

        <nav className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}

          <form className="navbar__search navbar__search--mobile" onSubmit={handleSearchSubmit}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search medicines..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          {isAuthenticated ? (
            <div className="navbar__user-mobile">
              <p>Hi, {user.fullName?.split(" ")[0]}</p>
              <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary navbar__login-mobile" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </nav>

        <div className="navbar__actions">
          <button
            className="icon-btn navbar__search-toggle"
            aria-label="Toggle search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <FaSearch />
          </button>

          <Link to="/cart" className="icon-btn navbar__cart" aria-label="Cart">
            <FaShoppingCart />
            {itemCount > 0 && <span className="navbar__cart-badge">{itemCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="navbar__user">
              <FaUserCircle className="navbar__user-icon" />
              <div className="navbar__user-dropdown">
                <p className="navbar__user-name">{user.fullName}</p>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary navbar__login-desktop">
              Login
            </Link>
          )}

          <button
            className="navbar__toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form className="navbar__search-bar" onSubmit={handleSearchSubmit}>
          <div className="container navbar__search-bar-inner">
            <FaSearch />
            <input
              type="text"
              autoFocus
              placeholder="Search for medicines, vitamins, devices..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">Search</button>
          </div>
        </form>
      )}
    </header>
  );
}
