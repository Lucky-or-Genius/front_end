import React, { useState } from "react";
import { IoOptionsOutline, IoReloadOutline } from "react-icons/io5";
import { MdOutlinePhotoFilter, MdOutlineTopic } from "react-icons/md";
import Popper from "../common/popover";

const FilterButton = ({ buttonName, isActive, onClick }) => (
  <button
    className={`w-full bg-[#ffffff20] text-white p-2 rounded-md hover:bg-[#ffffff40] transition-all ease-in-out ${
      isActive ? "bg-[#ffffff40]" : ""
    }`}
    onClick={() => onClick(buttonName)}
  >
    {buttonName}
  </button>
);

const ResetButton = ({ onClick }) => (
  <button
    className="w-fit flex items-center text-sm gap-2 bg-[#ffffff70] text-black cursor-pointer rounded-lg p-2 mt-2"
    onClick={onClick}
  >
    Reset <IoReloadOutline />
  </button>
);

const FilterPopper = ({ triggerLabel, triggerIcon, children }) => (
  <Popper
    trigger={
      <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
        {triggerLabel} {triggerIcon}
      </button>
    }
  >
    {children}
  </Popper>
);

const Filters = ({
  fetchSortedCategory,
  fetchSortedPrediction,
  fetchPredictionData,
}) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [activeTopic, setActiveTopic] = useState("");

  const statusOptions = ["True", "False", "PARTIALLY TRUE", "Pending"];
  const topicOptions = [
    "Economy",
    "Finance",
    "Politics",
    "Sci & Tech",
    "Social & Health",
    "Other",
  ];

  const handleStatusClick = (status) => {
    setActiveStatus(status);
    fetchSortedCategory(status);
  };

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
    fetchSortedPrediction(topic);
  };

  const resetStatus = () => {
    setActiveStatus("");
    fetchPredictionData();
  };

  const resetTopic = () => {
    setActiveTopic("");
    fetchPredictionData();
  };

  return (
    <div className="flex gap-4 py-4">
      <span className="flex items-center gap-2 text-primary400 font-raleway font-[500]">
        Filters
        <IoOptionsOutline className="border border-primary400 rounded-full p-1 w-6 h-6" />
      </span>

      <div className="flex gap-2 font-raleway">
        {/* Status Filter */}
        <FilterPopper
          triggerLabel="Status"
          triggerIcon={<MdOutlinePhotoFilter />}
        >
          <div className="font-raleway p-4 flex w-full items-end flex-col">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {statusOptions.map((status) => (
                <FilterButton
                  key={status}
                  buttonName={status}
                  isActive={activeStatus === status}
                  onClick={handleStatusClick}
                />
              ))}
            </div>
            <ResetButton onClick={resetStatus} />
          </div>
        </FilterPopper>

        {/* Topic Filter */}
        <FilterPopper triggerLabel="Topic" triggerIcon={<MdOutlineTopic />}>
          <div className="font-raleway p-4 flex w-full items-end flex-col">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {topicOptions.map((topic) => (
                <FilterButton
                  key={topic}
                  buttonName={topic}
                  isActive={activeTopic === topic}
                  onClick={handleTopicClick}
                />
              ))}
            </div>
            <ResetButton onClick={resetTopic} />
          </div>
        </FilterPopper>
      </div>
    </div>
  );
};

export default Filters;
