import React, { useState } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { PiSortDescendingBold } from "react-icons/pi";

const Filters = ({ getSortedUserSubject }) => {
  const status = ["All", "True", "False", "Pending", "Partially True"];
  const [active, setActive] = useState(0);

  const handleStatusClick = async (item, index) => {
    if (item === "PARTIALLY TRUE") item = "PARTIALLY%20TRUE";
    if (item === "ALL") item = "";
    setActive(index);
    try {
      await getSortedUserSubject(item);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-4 py-4 flex-wrap justify-center md:justify-start">
      <span className="flex items-center gap-2 text-primary400 font-raleway font-[500]">
        Filters{" "}
        <IoOptionsOutline className="border border-primary400 rounded-full p-1 w-6 h-6" />
      </span>

      <div className="gap-2 flex font-raleway flex-wrap justify-center md:justify-start">
        {status.map((item, index) => (
          <button
            className={`${
              active === index ? "bg-[#ffffff20]" : ""
            } hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]`}
            key={index}
            onClick={() => handleStatusClick(item.toUpperCase(), index)}
          >
            {item} <PiSortDescendingBold />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
