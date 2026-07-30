import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Hero from "../components/Hero.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Testimonials from "../components/Testimonials.jsx";
import useReveal from "../hooks/useReveal";
import categories from "../data/categories.js";
import products from "../data/products.js";
import "./Home.css";

export default function Home() {
  const [catHeadRef, catHeadVisible] = useReveal();
  const [prodHeadRef, prodHeadVisible] = useReveal();

  return (
    <>
      <Hero />

      <section className="section home-categories">
        <div className="container">
          <div className="home-section-head">
            <div ref={catHeadRef} className={`reveal ${catHeadVisible ? "is-visible" : ""}`}>
              <p className="section-eyebrow">Browse</p>
              <h2 className="section-title">Shop by Category</h2>
            </div>
            <Link to="/categories" className="home-view-all">
              View All <FaArrowRight />
            </Link>
          </div>

          <div className="grid-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt home-products">
        <div className="container">
          <div className="home-section-head">
            <div ref={prodHeadRef} className={`reveal ${prodHeadVisible ? "is-visible" : ""}`}>
              <p className="section-eyebrow">Bestsellers</p>
              <h2 className="section-title">Popular Medicines</h2>
            </div>
            <Link to="/medicines" className="home-view-all">
              View All <FaArrowRight />
            </Link>
          </div>

          <div className="grid-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
