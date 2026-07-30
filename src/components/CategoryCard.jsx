import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ category }) {
  const Icon = category.icon;
  return (
    <Link to={`/medicines?category=${category.id}`} className="category-card card">
      <span className="category-card__icon" style={{ background: `${category.color}1a`, color: category.color }}>
        <Icon />
      </span>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
    </Link>
  );
}
