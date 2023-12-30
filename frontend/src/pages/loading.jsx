import React, { useEffect, useState } from "react";
import { useFetch } from "../state";

export default function Loading() {
  const [dotCount, setDotCount] = useState(1);
  const { theme } = useFetch((state) => state.ui);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : ++prev));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="loading-page">
      <img src={`/logo-${theme}.svg`} alt="Home" />

      <div className="message">{"Loading" + ".".repeat(dotCount)}</div>
    </div>
  );
}
