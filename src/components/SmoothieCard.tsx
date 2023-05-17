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
    <div className="flex items-start justify-between gap-4 rounded-md bg-sky-50 p-6 shadow-md md:flex-col md:justify-start md:gap-3">
      <div>
        <h3 className="font-bold text-sky-800 lg:text-lg">{smoothie.title}</h3>
        <p className="text-sm font-light text-sky-700 lg:text-base">
          {smoothie.method}
        </p>
      </div>
      <div>
        <h4 className="font-extrabold text-sky-900/40 lg:text-lg">
          {smoothie.rating}
        </h4>
        <RatingCard rating={smoothie.rating} />
      </div>
    </div>
  );
};

export default SmoothieCard;
