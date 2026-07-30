import CategoryCard from "../components/CategoryCard.jsx";
import categories from "../data/categories.js";
import "./Categories.css";

export default function Categories() {
  return (
    <div className="categories-page">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">Browse</p>
          <h1 className="section-title">All Categories</h1>
          <p className="section-sub">
            Explore our full range of healthcare categories, from everyday medicines to wellness
            essentials.
          </p>
        </div>

        <div className="grid-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}
