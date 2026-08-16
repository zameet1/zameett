"use client";

import { useEffect, useState } from "react";

const FALLBACK_COUNT = 0;

export default function LiveClientCount() {
  const [count, setCount] = useState(FALLBACK_COUNT);

  useEffect(() => {
    let active = true;
    fetch("/api/public-stats")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (active && Number.isInteger(data?.clients) && data.clients >= FALLBACK_COUNT) setCount(data.clients);
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  return <div className="stat-num" aria-label={`${count} plus clients worldwide`}>{count}+</div>;
}
