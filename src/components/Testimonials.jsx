import { FaStar, FaQuoteLeft } from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import testimonials from "../data/testimonials.js";
import "./Testimonials.css";

export default function Testimonials() {
  const [headRef, headVisible] = useReveal();

  return (
    <section className="section testimonials">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? "is-visible" : ""}`}>
          <p className="section-eyebrow">Testimonials</p>
          <h2 className="section-title">What our customers say</h2>
        </div>

        <div className="grid-4 testimonials__grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`testimonial-card card reveal reveal-delay-${(index % 4) + 1} ${visible ? "is-visible" : ""}`}
    >
      <FaQuoteLeft className="testimonial-card__quote" />
      <div className="testimonial-card__rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={i < testimonial.rating ? "is-filled" : ""} />
        ))}
      </div>
      <p className="testimonial-card__review">{testimonial.review}</p>
      <div className="testimonial-card__author">
        <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
        <div>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.location}</span>
        </div>
      </div>
    </div>
  );
}
