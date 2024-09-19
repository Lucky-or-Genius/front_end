"use client";
import React from "react";

import useIsMobile from "../../hooks/useIsMobile";
import { cn } from "../../utils/cn";

const Modal = ({ children, className, ref }) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={
        "fixed left-0 top-0 z-[9999] flex h-full w-full  items-end md:items-center  justify-center  backdrop-blur "
      }
    >
      <div className="absolute h-screen w-full bg-[#0C111D] opacity-[0.3] bg-blend-overlay backdrop-blur-xl "></div>
      {isMobile !== undefined && (
        <div
          className={cn(
            "w-full h-full z-[1200] flex justify-center items-center relative",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Modal;
