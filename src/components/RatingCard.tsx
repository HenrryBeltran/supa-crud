import React from "react";

const RatingCard: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStar = (
    <svg className="h-5 w-5 fill-yellow-500" viewBox="0 96 960 960">
      <path d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
    </svg>
  );

  const halfStar = (
    <svg className="h-5 w-5 fill-yellow-500" viewBox="0 96 960 960">
      <path d="M480 370v387l157 95-42-178 138-120-182-16-71-168ZM233 976l65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
    </svg>
  );

  const emptyStar = (
    <svg className="h-5 w-5 fill-slate-400" viewBox="0 96 960 960">
      <path d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z" />
    </svg>
  );

  const wholeRating = Math.floor(rating);
  const isWholeNumber = rating % 1 != 0;
  const half = isWholeNumber ? 1 : 0;
  const remainder = 5 - wholeRating - half;

  function renderStarCollection(amount: number, star: React.JSX.Element) {
    const array: React.JSX.Element[] = [];
    for (let index = 0; index < amount; index++) {
      array.push(star);
    }

    return array.map((star) => star);
  }

  return (
    <div className="flex">
      {renderStarCollection(wholeRating, fullStar)}
      {isWholeNumber && halfStar}
      {renderStarCollection(remainder, emptyStar)}
    </div>
  );
};
export default RatingCard;
