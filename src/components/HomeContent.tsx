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
  const [smoothies, setSmoothies] = useState<Smoothie[] | object[] | null>(
    null
  );

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("Smoothies").select();

      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
        console.log(data);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <section className="px-32 pt-32">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="grid grid-cols-3 gap-8">
          {smoothies?.map((smoothie) => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HomeContent;
