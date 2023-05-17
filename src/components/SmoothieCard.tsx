import React from "react";
import RatingCard from "./RatingCard";

type Smoothie = {
  smoothie: {
    id: number;
    created_at: Date;
    title: string;
    method: string;
    rating: number;
  };
};

const SmoothieCard: React.FC<Smoothie> = ({ smoothie }) => {
  return (
    <div>
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div>{smoothie.rating}</div>
      <RatingCard rating={smoothie.rating} />
    </div>
  );
};

export default SmoothieCard;
