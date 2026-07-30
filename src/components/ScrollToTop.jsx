import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ensures each new page starts scrolled to the top instead of keeping the
// previous page's scroll position.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return null;
}
