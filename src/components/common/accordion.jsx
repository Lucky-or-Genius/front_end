"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import { cn } from "../../utils/cn";

const Accordion = ({ isOpen, Heading, children }) => {
  const [open, setOpen] = useState(isOpen || false);

  const toggleAccordion = () => setOpen((prev) => !prev);

  return (
    <div className="w-full 2md:w-4/5 mx-auto backdrop-blur-md border border-[#ffffff20] p-4 md:p-6 bg-[#ffffff20] rounded-xl hover:border-primary400 transition-all ease-in-out shadow-black">
      <button
        className="w-full flex items-center justify-between  text-lg font-semibold"
        onClick={toggleAccordion}
      >
        <span className="text-start text-white font-raleway text-lg md:text-2xl">
          {Heading}
        </span>
        <span
          className={cn("rotate-0 transition-all text-white", {
            "rotate-180": open,
          })}
        >
          <FaChevronDown />
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 text-text_secondary font-normal text-start  ",
          {
            "max-h-0 opacity-0": !open,
            " opacity-100 mt-3": open,
          }
        )}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
