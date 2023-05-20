import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import supabase from "../supabase/client";
import SmoothieCard from "./SmoothieCard";

interface Smoothie {
  id: number;
  created_at: string;
  title: string;
  method: string;
  rating: number;
}

const filters = [
  {
    id: 1,
    name: "time",
    type: "created_at",
    isAscending: false,
  },
  {
    id: 2,
    name: "name",
    type: "title",
    isAscending: true,
  },
  {
    id: 3,
    name: "rating",
    type: "rating",
    isAscending: false,
  },
];

const SmoothiesContent = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [smoothies, setSmoothies] = useState<Smoothie[] | null>(null);
  const [orderBy, setOrderBy] = useState(filters[0]);

  const handleDelete = (id: number) => {
    setSmoothies((prevSmoothies) => {
      if (prevSmoothies) {
        return prevSmoothies.filter((sm) => sm.id !== id);
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("Smoothies")
        .select<"*", Smoothie>("*")
        .order(orderBy.type, { ascending: orderBy.isAscending });

      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
        return;
      }
      if (data) {
        setFetchError(null);
        setSmoothies(data);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <section className="pt-6 lg:px-32 lg:pt-12">
      <div className="mb-8 space-y-2">
        <p className="pl-2 text-sm text-sky-700">Order by</p>
        <Listbox value={orderBy} onChange={setOrderBy}>
          <div className="relative text-sky-900">
            <Listbox.Button className="relative cursor-default rounded-lg bg-slate-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
              <span className="block truncate">{orderBy.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-32 overflow-auto rounded-md bg-slate-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filters.map((order, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-sky-100 text-sky-900" : "text-sky-900"
                      }`
                    }
                    value={order}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {order.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {fetchError && (
        <p className="text-center text-xl font-bold text-rose-500">
          {fetchError}
        </p>
      )}
      {smoothies && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {smoothies?.map((smoothie) => (
            <SmoothieCard
              key={smoothie.id}
              smoothie={smoothie}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SmoothiesContent;
