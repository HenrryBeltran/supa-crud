import React, { ChangeEvent, FormEventHandler, useState } from "react";

const SmoothieForm = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:w-[28rem] [&>input]:outline-none"
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <label htmlFor="title">Method</label>
      <input
        type="text"
        id="method"
        value={method}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMethod(e.target.value)
        }
        className="min-h-fit flex-wrap"
      />
      <label htmlFor="title">rating</label>
      <input
        type="number"
        id="rating"
        value={rating}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRating(e.target.value)
        }
      />
      <button>Create Smoothie Recipe</button>
    </form>
  );
};
export default SmoothieForm;
