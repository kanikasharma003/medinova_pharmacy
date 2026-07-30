import { useEffect, useState } from "react";
import { FaBullseye, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import "./About.css";

const STATS = [
  { label: "Happy Customers", value: 10000, suffix: "+" },
  { label: "Products", value: 5000, suffix: "+" },
  { label: "Healthcare Brands", value: 500, suffix: "+" },
  { label: "Customer Support", value: 24, suffix: "/7", noComma: true },
];

export default function About() {
  const [introRef, introVisible] = useReveal();

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div ref={introRef} className={`reveal ${introVisible ? "is-visible" : ""}`}>
            <p className="section-eyebrow">About MediNova</p>
            <h1 className="section-title">Healthcare, reimagined for everyone</h1>
            <p className="about-hero__text">
              MediNova is an online pharmacy platform built to make genuine medicines and healthcare
              products accessible to every household. We started with a simple belief — getting the
              right medicine on time shouldn't be complicated.
            </p>

            <div className="about-hero__points">
              <div>
                <FaBullseye />
                <div>
                  <h4>Our Mission</h4>
                  <p>Making trustworthy healthcare products accessible, affordable, and delivered fast.</p>
                </div>
              </div>
              <div>
                <FaHandHoldingHeart />
                <div>
                  <h4>Why Customers Trust Us</h4>
                  <p>Every product is verified and sourced from licensed manufacturers and brands.</p>
                </div>
              </div>
              <div>
                <FaUsers />
                <div>
                  <h4>Healthcare-Focused</h4>
                  <p>Our pharmacist-backed team is always available to guide your healthcare decisions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-hero__image">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop"
              alt="MediNova pharmacy team"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section section-alt about-stats">
        <div className="container">
          <div className="grid-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ stat }) {
  const [ref, visible] = useReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1400;
    const steps = 40;
    const increment = stat.value / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      current += increment;
      if (step >= steps) {
        setCount(stat.value);
        clearInterval(interval);
      } else {
        setCount(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [visible, stat.value]);

  const display = stat.noComma ? count : count.toLocaleString("en-IN");

  return (
    <div ref={ref} className={`about-stat card reveal ${visible ? "is-visible" : ""}`}>
      <h3>
        {display}
        {stat.suffix}
      </h3>
      <p>{stat.label}</p>
    </div>
  );
}
