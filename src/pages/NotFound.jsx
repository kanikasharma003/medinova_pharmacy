import { Link } from "react-router-dom";
import { FaCapsules } from "react-icons/fa";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found container">
      <FaCapsules />
      <h1>404</h1>
      <p>This page doesn't exist. Let's get you back to safety.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
