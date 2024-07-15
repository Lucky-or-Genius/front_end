import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoOptionsOutline } from "react-icons/io5";
import { PiSortDescendingBold } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
import { Popover } from "antd";
import Image from "../assets/hover_info2.png";

const NewLeaderboard = () => {
  return (
    <div className="bg-primary h-screen w-full overflow-hidden">
      <div className="w-full flex py-6 justify-center">
        <span className="font-raleway text-3xl text-white font-[600]">
          Leaderboard
        </span>
      </div>
      <div className="flex flex-col gap-2 w-full items-center pb-6">
        <div className="border border-primary400 rounded-full flex px-4 py-2 items-center text-white text-poppins gap-4 w-1/3">
          <FiSearch />
          <input
            type="search"
            className="bg-transparent outline-none font-poppins text-white text-xs w-full"
            placeholder="Search"
          />
        </div>
        <div className="flex gap-4 py-4">
          <span className="flex items-center gap-2 text-primary400 font-raleway font-[500]">
            Filters{" "}
            <IoOptionsOutline className="border border-primary400 rounded-full p-1 w-6 h-6" />
          </span>
          <div className="gap-2 flex font-raleway">
            <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
              Accuracy <PiSortDescendingBold />
            </button>
            <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
              Points <PiSortDescendingBold />
            </button>
            <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
              Bankroll <PiSortDescendingBold />
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center gap-4 h-full font-poppins">
        <div className="bg-[#ffffff30] flex justify-start w-2/5 rounded-xl p-2 overflow-y-auto h-4/6 flex-col gap-2 divide-y divide-[#ffffff60] items-center">
          <div className="flex items-center justify-between w-full hover:bg-[#ffffff10] hover:rounded-lg p-2">
            <div className="flex items-center gap-2">
              <img
                src={Image}
                alt="image"
                className=""
                width={40}
                height={40}
              />
              <Popover
                content={"this is hello"}
                title="Title"
                trigger="hover"
                className="cursor-pointer text-white text-lg hover:underline"
              >
                hello
              </Popover>
            </div>
            <div className="flex items-center text-[#ffffff60] gap-4 text-lg">
              <span className="">$1000</span>
              <IoMdHeartEmpty />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLeaderboard;
