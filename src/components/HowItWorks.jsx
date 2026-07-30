import { FaSearch, FaShoppingCart, FaClipboardCheck, FaTruck } from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import "./HowItWorks.css";

const STEPS = [
  { icon: FaSearch, title: "Search Your Medicine", text: "Find exactly what you need using our smart search and categories." },
  { icon: FaShoppingCart, title: "Add to Cart", text: "Add products to your cart and review quantities before checkout." },
  { icon: FaClipboardCheck, title: "Place Your Order", text: "Confirm your delivery address and place your order securely." },
  { icon: FaTruck, title: "Get It Delivered", text: "Sit back while your order is packed and delivered to your doorstep." },
];

export default function HowItWorks() {
  const [headRef, headVisible] = useReveal();

  return (
    <section className="section section-alt how-it-works">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? "is-visible" : ""}`}>
          <p className="section-eyebrow">How It Works</p>
          <h2 className="section-title">Ordering made simple</h2>
        </div>

        <div className="how-it-works__steps">
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index, isLast }) {
  const [ref, visible] = useReveal();
  const Icon = step.icon;
  return (
    <div
      ref={ref}
      className={`how-it-works__step reveal reveal-delay-${(index % 4) + 1} ${visible ? "is-visible" : ""}`}
    >
      <div className="how-it-works__icon-wrap">
        <span className="how-it-works__number">{index + 1}</span>
        <span className="how-it-works__icon">
          <Icon />
        </span>
      </div>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
      {!isLast && <span className="how-it-works__connector" aria-hidden="true" />}
    </div>
  );
}
