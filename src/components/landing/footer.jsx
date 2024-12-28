import React from "react";
import { NavLink } from "react-router-dom";

const footer = () => {
  const routes = [
    { src: "/", name: "Home" },
    { src: "/about", name: "About" },
    { src: "/contact", name: "Contact" },
    { src: "/dashboard/Feed", name: "Get Started" },
  ];
  return (
    <div className="max-w-[1000px] w-full justify-between flex md:flex-row flex-col -m-16 z-[1] items-center">
      <div className="text-gray-500 order-2 md:order-1">
        © 2024, Lucky Or Genius
      </div>
      <ul className="flex gap-4 md:gap-6 text-gray-500 flex-row md:order-2 order-1 py-4 md:py-0">
        {routes.map((route, i) => (
          <li className="hover:text-white transition-all ease-in-out" key={i}>
            <NavLink to={route.src}>{route.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default footer;
