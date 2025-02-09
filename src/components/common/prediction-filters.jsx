import React, { useState } from "react";
import { IoOptionsOutline, IoReloadOutline } from "react-icons/io5";
import { MdOutlinePhotoFilter, MdOutlineTopic } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Popper from "./popover";
import AdvanceSearchBar from "./advance-search-bar";

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

const FilterTag = ({ label, onRemove }) => (
  <span className="flex items-center gap-1 bg-[#ffffff30] font-poppins text-white px-3 py-1 rounded-full text-sm">
    {label}
    <button
      onClick={onRemove}
      className="hover:bg-[#ffffff20] rounded-full p-1"
    >
      <IoClose size={14} />
    </button>
  </span>
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
  setCategory,
  setPredictionType,
  setCurrentPage,
  setNameTerm,
  setPredictionTerm,
  predictionTerm,
  nameTerm,
}) => {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

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
    setSelectedStatuses((prev) => {
      const newStatuses = prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status];
      setPredictionType(newStatuses.join(","));
      setCurrentPage(1);
      return newStatuses;
    });
  };

  const handleTopicClick = (topic) => {
    setSelectedTopics((prev) => {
      const newTopics = prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic];
      setCategory(newTopics.join(","));
      setCurrentPage(1);
      return newTopics;
    });
  };

  const removeStatus = (status) => {
    setSelectedStatuses((prev) => {
      const newStatuses = prev.filter((s) => s !== status);
      setPredictionType(newStatuses.join(","));
      setCurrentPage(1);
      return newStatuses;
    });
  };

  const removeTopic = (topic) => {
    setSelectedTopics((prev) => {
      const newTopics = prev.filter((t) => t !== topic);
      setCategory(newTopics.join(","));
      setCurrentPage(1);
      return newTopics;
    });
  };

  const resetStatus = () => {
    setSelectedStatuses([]);
    setPredictionType("");
    setCurrentPage(1);
  };

  const resetTopic = () => {
    setSelectedTopics([]);
    setCategory("");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="w-full flex justify-between items-center md:flex-row flex-col">
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
                      isActive={selectedStatuses.includes(status)}
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
                      isActive={selectedTopics.includes(topic)}
                      onClick={handleTopicClick}
                    />
                  ))}
                </div>
                <ResetButton onClick={resetTopic} />
              </div>
            </FilterPopper>
          </div>
        </div>

        <div className="">
          <AdvanceSearchBar
            setNameTerm={setNameTerm}
            setPredictionTerm={setPredictionTerm}
            predictionTerm={predictionTerm}
            nameTerm={nameTerm}
          />
        </div>
      </div>

      {/* Applied Filters */}
      {(selectedStatuses.length > 0 || selectedTopics.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedStatuses.map((status) => (
            <FilterTag
              key={status}
              label={status}
              onRemove={() => removeStatus(status)}
            />
          ))}
          {selectedTopics.map((topic) => (
            <FilterTag
              key={topic}
              label={topic}
              onRemove={() => removeTopic(topic)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
