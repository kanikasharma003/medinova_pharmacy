import "./Loader.css";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="loader">
      <span className="loader__spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
