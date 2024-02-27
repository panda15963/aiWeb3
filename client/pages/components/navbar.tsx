import React, { useState } from "react";
import Link from "next/link";
import { GiArtificialIntelligence } from "react-icons/gi";
import Signin from "./signin";
const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
      <nav className="flex items-center flex-wrap bg-sky-600 p-3 ">
        <Link href="/" className="inline-flex items-center p-2 mr-4 ">
          <GiArtificialIntelligence className="text-white text-5xl" />
          <span className="text-xl text-white font-bold uppercase tracking-wide">
            GenAImage
          </span>
        </Link>
        <button
          onClick={handleClick}
          className="inline-flex p-3 hover:bg-sky-900 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
        >
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
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <Signin/>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
