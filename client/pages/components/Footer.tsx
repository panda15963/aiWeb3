import React from "react";
const Footer = () => {
    return (React.createElement("div", { className: "bg-sky-500 text-black p-8 text-center text-xl text-white font-bold" },
        React.createElement("p", null,
            "Built with ",
            React.createElement("a", { href: "https://nextjs.org/" }, "Next.js"),
            " and ",
            React.createElement("a", { href: "https://tailwindcss.com/" }, "Tailwind CSS"))));
}
export default Footer;