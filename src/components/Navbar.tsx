import React from "react";

function Navbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between bg-sky-100 bg-opacity-60 px-16 py-4 backdrop-blur-[6px]">
      <h1 className="text-lg font-bold tracking-tighter text-sky-700">
        <a href="/">Supa Smoothies</a>
      </h1>
      <ul className="flex gap-6">
        <li>
          <a
            className="font-medium text-sky-500 hover:text-sky-700 hover:underline hover:underline-offset-2"
            href="/"
          >
            Home
          </a>
        </li>
        <li>
          <a
            className="font-medium text-sky-500 hover:text-sky-700 hover:underline hover:underline-offset-2"
            href="/create/"
          >
            New Smoothie
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
