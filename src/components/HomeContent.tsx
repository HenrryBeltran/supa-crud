import React, { useEffect, useState } from "react";
import supabase from "../supabase/client";
import SmoothieCard from "./SmoothieCard";

interface Smoothie {
  id: number;
  created_at: Date;
  title: string;
  method: string;
  rating: number;
}

function HomeContent() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchState, setFetchState] = useState<string>("idle");
  const [smoothies, setSmoothies] = useState<Smoothie[] | object[] | null>(
    null
  );

  useEffect(() => {
    const fetchSmoothies = async () => {
      setFetchState("loading");
      const { data, error } = await supabase.from("Smoothies").select();

      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        setFetchState("failed");
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
        setFetchState("completed");
        console.log(data);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <section className="pt-12 lg:px-32 lg:pt-32">
      {fetchError && <p>{fetchError}</p>}
      {fetchState === "loading" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-5">
          <div className="h-32 animate-pulse rounded-md bg-sky-50 p-6 shadow-md"></div>
          <div className="h-32 animate-pulse rounded-md bg-sky-50 p-6 shadow-md"></div>
          <div className="h-32 animate-pulse rounded-md bg-sky-50 p-6 shadow-md"></div>
          <div className="h-32 animate-pulse rounded-md bg-sky-50 p-6 shadow-md"></div>
        </div>
      )}
      {smoothies && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {smoothies?.map((smoothie) => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HomeContent;
