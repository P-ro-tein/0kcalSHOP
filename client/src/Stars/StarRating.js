import React, { useState } from "react";
import Star from "./Star";

const createArray = (length) => Array.from({ length });

export default function StarRating({ totalStars = 5 }) {
  const [selectedTotalStars, setSelectedTotalStars] = useState(0);
  return (
    <>
      <p>총평</p>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedTotalStars > i}
          onSelect={() => setSelectedTotalStars(i + 1)}
        />
      ))}
    </>
  );
}
