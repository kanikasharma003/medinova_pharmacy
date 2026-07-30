import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaShoppingCart, FaCheck } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product.stock) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card card">
      <Link to={`/product/${product.id}`} className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.discount > 0 && (
          <span className="badge badge-discount product-card__discount">-{product.discount}%</span>
        )}
        {!product.stock && <span className="product-card__oos">Out of Stock</span>}
      </Link>

      <div className="product-card__body">
        <Link to={`/product/${product.id}`} className="product-card__name">
          {product.name}
        </Link>
        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__rating">
          <FaStar />
          <span>{product.rating}</span>
          <span className="product-card__reviews">({product.reviews})</span>
        </div>

        <div className="product-card__price">
          <span className="product-card__price-now">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="product-card__price-old">₹{product.originalPrice}</span>
          )}
        </div>

        <div className="product-card__actions">
          <button
            className={`btn btn-sm ${added ? "btn-outline" : "btn-primary"} btn-block`}
            onClick={handleAdd}
            disabled={!product.stock}
          >
            {added ? <FaCheck /> : <FaShoppingCart />}
            {added ? "Added" : product.stock ? "Add to Cart" : "Unavailable"}
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
