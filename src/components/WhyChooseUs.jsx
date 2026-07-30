import { FaShieldAlt, FaShippingFast, FaLock, FaUserMd } from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import "./WhyChooseUs.css";

const FEATURES = [
  { icon: FaShieldAlt, title: "Genuine Medicines", text: "Every product is sourced directly from licensed manufacturers and verified brands." },
  { icon: FaShippingFast, title: "Fast Delivery", text: "Most orders reach you within 24-48 hours, safely packaged and temperature-controlled." },
  { icon: FaLock, title: "Secure Payment", text: "Your transactions are protected with industry-standard encryption at every step." },
  { icon: FaUserMd, title: "Expert Support", text: "Our pharmacist-backed support team is available around the clock for your questions." },
];

export default function WhyChooseUs() {
  const [headRef, headVisible] = useReveal();

  return (
    <section className="section why-choose">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? "is-visible" : ""}`}>
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="section-title">Healthcare you can rely on</h2>
          <p className="section-sub">
            We built MediNova around the things that matter most when it comes to your health.
          </p>
        </div>

        <div className="grid-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const [ref, visible] = useReveal();
  const Icon = feature.icon;
  return (
    <div
      ref={ref}
      className={`why-choose__card card reveal reveal-delay-${(index % 4) + 1} ${visible ? "is-visible" : ""}`}
    >
      <span className="why-choose__icon">
        <Icon />
      </span>
      <h3>{feature.title}</h3>
      <p>{feature.text}</p>
    </div>
  );
}
