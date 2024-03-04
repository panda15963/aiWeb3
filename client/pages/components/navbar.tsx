// src/components/Navbar.tsx

import React, { useState } from "react";
import {
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { GiArtificialIntelligence } from "react-icons/gi";
import SignIn from "./signin";

// Navbar component for the GenAImage website
const Navbar = () => {
  // Initialize the state variable 'active' to false
  const [active, setActive] = useState(false);

  // Function to toggle the 'active' state variable
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      {/* Navigation bar container */}
      <nav className="flex items-center flex-wrap bg-sky-600 p-3 ">
        {/* Link to the homepage */}
        <Link href="/" className="inline-flex items-center p-2 mr-4 ">
          {/* AI logo and name */}
          <GiArtificialIntelligence className="text-white text-5xl" />
          <span className="text-xl text-white font-bold uppercase tracking-wide">
            GenAImage
          </span>
        </Link>
        {/* Button for toggling navigation links on smaller screens */}
        <button
          onClick={handleClick}
          className="inline-flex p-3 hover:bg-sky-900 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
        >
          {/* Icon for navigation links */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Navigation links container */}
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          {/* Container for navigation links */}
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            {/* Navigation link: Service */}
            <Button
              href="/components/service"
              className="px-2 py-2 lg:inline-flex lg:w-auto w-full px-3 py-2 rounded bg-sky-600 text-white font-bold items-center justify-center hover:bg-sky-900"
            >
              {/* Link text */}
              Service
            </Button>
            {/* Navigation link: Pricing */}
            <Button
              href="/components/prices/pricing"
              className="px-2 py-2 lg:inline-flex lg:w-auto w-full px-3 py-2 rounded bg-sky-600 text-white font-bold items-center justify-center hover:bg-sky-900"
            >
              {/* Link text */}
              Pricing
            </Button>
            <div className="px-2 py-2 lg:inline-flex lg:w-auto w-full">
              <SignIn />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// Export the Navbar component
export default Navbar;
