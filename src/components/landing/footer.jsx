import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className="max-w-[1000px] w-full justify-between flex md:flex-row flex-col -m-16 z-[1] items-center">
      <div className="text-gray-500 order-2 md:order-1">
        © 2024, Lucky & Genius
      </div>
      <ul className="flex gap-4 md:gap-6 text-gray-500 md:flex-row flex-col md:order-2 order-1 py-4 md:py-0">
        <li className="hover:text-white transition-all ease-in-out">
          <Link href="/"> Home</Link>
        </li>
        <li className="hover:text-white transition-all ease-in-out">
          <Link href="/about"> About</Link>
        </li>
        <li className="hover:text-white transition-all ease-in-out">
          <Link href="/contact"> Contact</Link>
        </li>
        <li className="hover:text-white transition-all ease-in-out">
          <Link href="/login"> Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default footer;
