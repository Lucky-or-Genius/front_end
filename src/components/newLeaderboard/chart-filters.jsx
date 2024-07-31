import React from "react";

import { IoOptionsOutline } from "react-icons/io5";
import { PiSortDescendingBold } from "react-icons/pi";

const filters = () => {
  return (
    <div className="flex gap-4 py-4">
      <span className="flex items-center gap-2 text-primary400 font-raleway font-[500]">
        Filters{" "}
        <IoOptionsOutline className="border border-primary400 rounded-full p-1 w-6 h-6" />
      </span>
      <div className="gap-2 flex font-raleway">
        <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
          All <PiSortDescendingBold />
        </button>
        <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
          True <PiSortDescendingBold />
        </button>
        <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
          False <PiSortDescendingBold />
        </button>
        <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
          Pending <PiSortDescendingBold />
        </button>
        <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
          Partially True <PiSortDescendingBold />
        </button>
      </div>
    </div>
  );
};

export default filters;
