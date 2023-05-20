import React from "react";
import moment from "moment";

import RatingCard from "./RatingCard";
import supabase from "../supabase/client";

type Smoothie = {
  smoothie: {
    id: number;
    created_at: string;
    title: string;
    method: string;
    rating: number;
  };
  onDelete: (id: number) => void;
};

const SmoothieCard: React.FC<Smoothie> = ({ smoothie, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("Smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 rounded-md bg-sky-50 p-4 shadow-md lg:p-6">
      <div className="col-span-2 mb-3">
        <h3 className="font-bold text-sky-800 lg:text-lg">{smoothie.title}</h3>
        <p className="mt-1 text-sm font-light text-sky-800 lg:text-base">
          {smoothie.method}
        </p>
        <p className="mt-1 text-sm font-medium text-sky-800/60 lg:text-base">
          {moment(smoothie.created_at).fromNow()}
        </p>
      </div>
      <div className="mt-auto h-min">
        <h4 className="font-extrabold text-sky-900/40 lg:text-lg">
          {smoothie.rating}
        </h4>
        <RatingCard rating={smoothie.rating} />
      </div>
      <div className="ml-auto mt-auto flex h-min gap-2">
        <a
          href={`/edit/${smoothie.id}`}
          aria-label="Edit smoothie"
          className="rounded-full p-3 hover:bg-sky-200/50 lg:p-2"
        >
          <svg
            viewBox="0 96 960 960"
            className="h-5 w-5 fill-sky-600/50 hover:fill-sky-800"
          >
            <path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" />
          </svg>
        </a>
        <button
          aria-label="Delete Smoothie"
          onClick={handleDelete}
          className="rounded-full p-3 hover:bg-sky-200/50 lg:p-2"
        >
          <svg
            viewBox="0 96 960 960"
            className="h-5 w-5 fill-sky-600/50 hover:fill-sky-800"
          >
            <path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SmoothieCard;
