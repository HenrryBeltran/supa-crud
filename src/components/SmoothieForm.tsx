import React, { ChangeEvent, useState } from "react";
import supabase from "../supabase/client";

const SmoothieForm = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill all the fields correctly");
      return;
    }

    if (rating > 5 || rating < 0) {
      setFormError("Rating only can be between 0 to 5");
      return;
    }

    const { data, error } = await supabase
      .from("Smoothies")
      .insert([{ title, method, rating }])
      .select();

    if (error) {
      console.log(error);
      setFormError("Please fill all the fields correctly");
    }

    if (data) {
      console.log(data);
      setFormError(null);
      window.location.href = "/";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-40 flex flex-col justify-center lg:w-[28rem] [&>input]:outline-none"
    >
      <label
        htmlFor="title"
        className="mb-2 pl-2.5 text-sm font-medium text-sky-800/70 md:text-base"
      >
        Title
      </label>
      <input
        type="text"
        id="title"
        placeholder="Milk Shake"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        className="mb-4 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm text-sky-900 lg:text-base"
      />

      <label
        htmlFor="method"
        className="mb-2 pl-2.5 text-sm font-medium text-sky-800/70 md:text-base"
      >
        Method
      </label>
      <textarea
        id="method"
        placeholder="Blend the fruits with milk..."
        value={method}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setMethod(e.target.value)
        }
        className="mb-4 resize-none rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm text-sky-900 outline-none lg:text-base"
      />

      <label
        htmlFor="rating"
        className="mb-2 pl-2.5 text-sm font-medium text-sky-800/70 md:text-base"
      >
        Rating
      </label>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        max={5}
        step=".1"
        id="rating"
        placeholder="5"
        value={rating}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRating(Number(e.target.value))
        }
        className="mb-4 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm text-sky-900 lg:text-base"
      />
      <button
        aria-label="Create smoothie recipe"
        className="mx-auto mt-4 w-fit rounded bg-sky-500 px-4 py-1.5 font-semibold text-white shadow-md hover:bg-sky-600"
      >
        Create Smoothie Recipe
      </button>

      {formError && (
        <p className="mt-4 text-center text-sm text-rose-500 md:text-base">
          {formError}
        </p>
      )}
    </form>
  );
};

export default SmoothieForm;
