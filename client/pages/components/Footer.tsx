import React, { createElement } from "react";
// Footer component
export default function Footer () {
  return createElement(
    "div",
    {
      className:
        "bg-sky-500 text-black p-8 text-center text-xl text-white font-bold",
    },
    // Render a div element with specified class name, content, and styles
    createElement(
      "p",
      null,
      "Built with ",
      createElement("a", { href: "https://nextjs.org/" }, "Next.js"),
      " and ",
      createElement(
        "a",
        { href: "https://tailwindcss.com/" },
        "Tailwind CSS"
      )
    )
  );
};