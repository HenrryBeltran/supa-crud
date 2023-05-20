import React, { ChangeEvent, useState } from "react";
import supabase from "../supabase/client";

interface Props {
  id: number;
  title: string;
  method: string;
  rating: number;
}

const EditSmoothieForm: React.FC<Props> = ({ id, title, method, rating }) => {
  const [editTitle, setTitle] = useState(title);
  const [editMethod, setMethod] = useState(method);
  const [editRating, setRating] = useState<number>(rating);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editTitle || !editMethod || !editRating) {
      setFormError("Please fill all the fields correctly");
      return;
    }

    if (editRating > 5 || editRating < 0) {
      setFormError("Rating only can be between 0 to 5");
      return;
    }

    const { data, error } = await supabase
      .from("Smoothies")
      .update({ title: editTitle, method: editMethod, rating: editRating })
      .eq("id", id)
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
        value={editTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        className="mb-4 rounded-md px-2.5 py-1.5 text-sm text-sky-900 lg:text-base"
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
        value={editMethod}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setMethod(e.target.value)
        }
        className="mb-4 resize-none rounded-md px-2.5 py-1.5 text-sm text-sky-900 outline-none lg:text-base"
      />

      <label
        htmlFor="rating"
        className="mb-2 pl-2.5 text-sm font-medium text-sky-800/70 md:text-base"
      >
        Rating
      </label>
      <input
        type="number"
        spellCheck={false}
        inputMode="numeric"
        min={0}
        max={5}
        step=".1"
        id="rating"
        placeholder="5"
        value={editRating}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRating(Number(e.target.value))
        }
        className="mb-4 rounded-md px-2.5 py-1.5 text-sm text-sky-900 lg:text-base"
      />
      <div className="flex w-full justify-between">
        <button
          aria-label="Save Smoothie"
          type="submit"
          className="mt-4 w-fit rounded bg-sky-500 px-4 py-1.5 font-semibold text-white shadow-md hover:bg-sky-600"
        >
          Save Smoothie
        </button>
        <a
          aria-label="Cancel Edit"
          href="/"
          className="mt-4 w-fit rounded border border-rose-500 bg-white px-4 py-1.5 font-semibold text-rose-500 shadow-md hover:bg-rose-500 hover:text-white"
        >
          Cancel
        </a>
      </div>

      {formError && (
        <p className="mt-4 text-center text-sm text-rose-500 md:text-base">
          {formError}
        </p>
      )}
    </form>
  );
};
export default EditSmoothieForm;
