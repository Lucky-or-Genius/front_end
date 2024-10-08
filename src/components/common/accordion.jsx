"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

import { cn } from "../../utils/cn";

const Accordion = ({ isOpen, Heading, children, className }) => {
  const [open, setOpen] = useState(isOpen || false);

  const toggleAccordion = () => setOpen((prev) => !prev);

  return (
    <div className="w-full w-full mx-auto backdrop-blur-md border-b border-[#ffffff20] py-2 md:py-4 hover:border-primary400 transition-all ease-in-out shadow-black">
      <button
        className="w-full flex items-center justify-between font-semibold"
        onClick={toggleAccordion}
      >
        <span className="text-start text-primary400 font-raleway text-base md:text-xl">
          {Heading}
        </span>
        <span
          className={cn(
            "rotate-0 transition-all text-primary400 font-semibold text-lg md:text-2xl",
            {
              "rotate-45": open,
            }
          )}
        >
          <FiPlus />
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
        <div className={`${className}`}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
