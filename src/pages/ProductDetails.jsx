import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaStar, FaMinus, FaPlus, FaShoppingCart, FaCheck, FaChevronLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import products from "../data/products.js";
import "./ProductDetails.css";

const TABS = [
  { id: "info", label: "Product Information" },
  { id: "benefits", label: "Benefits" },
  { id: "usage", label: "Usage" },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => String(p.id) === id);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("info");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container product-not-found">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist or may have been removed.</p>
        <Link to="/medicines" className="btn btn-primary">Back to Medicines</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-details container">
      <button className="product-details__back" onClick={() => navigate(-1)}>
        <FaChevronLeft /> Back
      </button>

      <div className="product-details__grid">
        <div className="product-details__image">
          <img src={product.image} alt={product.name} />
          {product.discount > 0 && (
            <span className="badge badge-discount product-details__discount">-{product.discount}%</span>
          )}
        </div>

        <div className="product-details__info">
          <span className="badge badge-teal">{product.category.replace("-", " ")}</span>
          <h1>{product.name}</h1>
          <p className="product-details__desc">{product.description}</p>

          <div className="product-details__rating">
            <FaStar />
            <span>{product.rating}</span>
            <span className="product-details__reviews">({product.reviews} reviews)</span>
          </div>

          <div className="product-details__price">
            <span className="product-details__price-now">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="product-details__price-old">₹{product.originalPrice}</span>
            )}
            {product.stock ? (
              <span className="badge badge-success">In Stock</span>
            ) : (
              <span className="badge badge-discount">Out of Stock</span>
            )}
          </div>

          <div className="product-details__qty-row">
            <span>Quantity</span>
            <div className="product-details__qty">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                <FaPlus />
              </button>
            </div>
          </div>

          <button
            className={`btn ${added ? "btn-outline" : "btn-primary"} product-details__cta`}
            onClick={handleAdd}
            disabled={!product.stock}
          >
            {added ? <FaCheck /> : <FaShoppingCart />}
            {added ? "Added to Cart" : product.stock ? "Add to Cart" : "Currently Unavailable"}
          </button>

          <div className="product-details__tabs">
            <div className="product-details__tab-list">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={activeTab === tab.id ? "is-active" : ""}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="product-details__tab-content">
              {activeTab === "info" && (
                <p>
                  {product.name} is part of our {product.category.replace("-", " ")} range, chosen for
                  quality and reliability. All products are sourced from verified brands and stored
                  under proper conditions before dispatch.
                </p>
              )}
              {activeTab === "benefits" && (
                <ul>
                  {product.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {activeTab === "usage" && <p>{product.usage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
