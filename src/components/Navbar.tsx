import React from 'react';

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white bg-opacity-60 px-4 py-4 backdrop-blur-[6px] lg:px-16">
      <h1 className="text-lg font-bold tracking-tighter text-sky-700">
        <a href="/">Supa Smoothies</a>
      </h1>
      <ul className="flex gap-6">
        <li>
          <a
            className="font-medium text-sky-800 hover:text-sky-500 hover:underline hover:underline-offset-2"
            aria-label="Home link"
            href="/"
          >
            Home
          </a>
        </li>
        <li>
          <a
            className="font-medium text-sky-800 hover:text-sky-500 hover:underline hover:underline-offset-2"
            aria-label="New smoothie link"
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
