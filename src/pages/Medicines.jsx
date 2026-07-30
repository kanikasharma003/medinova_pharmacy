import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaBoxOpen } from "react-icons/fa";
import ProductCard from "../components/ProductCard.jsx";
import categories from "../data/categories.js";
import products from "../data/products.js";
import "./Medicines.css";

export default function Medicines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "all";

  const [query, setQuery] = useState(urlSearch);

  // Keep the input in sync if the user arrives via a navbar search or category link.
  useEffect(() => {
    setQuery(urlSearch);
  }, [urlSearch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set("search", value);
      else next.delete("search");
      return next;
    });
  };

  const handleCategorySelect = (id) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (id === "all") next.delete("category");
      else next.set("category", id);
      return next;
    });
  };

  // Filtering uses Array.filter() against both the search term and selected category.
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = urlCategory === "all" || p.category === urlCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, urlCategory]);

  return (
    <div className="medicines-page">
      <div className="container">
        <div className="medicines-page__head">
          <div>
            <p className="section-eyebrow">Catalog</p>
            <h1 className="section-title">All Medicines</h1>
          </div>

          <div className="medicines-page__search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search medicines, vitamins, devices..."
              value={query}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="medicines-page__filters">
          <button
            className={`medicines-page__chip ${urlCategory === "all" ? "is-active" : ""}`}
            onClick={() => handleCategorySelect("all")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`medicines-page__chip ${urlCategory === c.id ? "is-active" : ""}`}
              onClick={() => handleCategorySelect(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid-4 medicines-page__grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaBoxOpen />
            <h3>No products found</h3>
            <p>Try a different search term or browse another category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
