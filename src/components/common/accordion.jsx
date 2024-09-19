"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import { cn } from "../../utils/cn";

const Accordion = ({ isOpen, Heading, children }) => {
  const [open, setOpen] = useState(isOpen || false);

  const toggleAccordion = () => setOpen((prev) => !prev);

  return (
    <div className="w-full mx-auto bg-white rounded-[12px] border border-smoke_white px-7 py-5">
      <button
        className="w-full flex items-center justify-between  text-lg font-semibold"
        onClick={toggleAccordion}
      >
        <span className="text-start">{Heading}</span>
        <span className={cn("rotate-180 transition-all", { "rotate-0": open })}>
          <FaChevronDown />
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 text-text_secondary font-normal text-start  ",
          {
            "max-h-0 opacity-0": !open,
            "max-h-screen opacity-100 mt-3": open,
          }
        )}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
