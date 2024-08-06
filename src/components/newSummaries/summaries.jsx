import React, { useState } from "react";

const Summaries = ({ summariesData }) => {
  const [subSectionIndex, setSubSectionIndex] = useState(0);
  return (
    <div className="w-full h-screen overflow-y-hidden flex gap-6">
      <div className="w-1/2 overflow-y-auto flex flex-col h-full">
        {summariesData.map((summary, index) => (
          <div
            className="bg-[#ffffff20] border border-[#ffffff20] hover:border-primary400 transition-all ease-in-out rounded-lg p-4 cursor-pointer mb-4"
            onClick={() => {
              setSubSectionIndex(index);
            }}
          >
            <span className="line-clamp-2 w-full font-poppins text-white">
              {summary?.summary_title}
            </span>
            <span className="bg-[#ffffff20] rounded-full px-2 text-white font-poppins">
              {summary?.time}
            </span>
          </div>
        ))}
      </div>
      <div className="w-1/2 flex flex-col gap-6">
        <div className="h-[30vh]">
          <iframe
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              height: "100%",
            }}
            alt=""
            src={`https://youtube.com/embed/${summariesData[subSectionIndex]?.youtube_id}?start=${summariesData[subSectionIndex]?.youtube_start_time}`}
          />
        </div>
        <div className="text-sm bg-[#ffffff20] text-[#ffffff80] font-poppins p-4 rounded-lg h-[20vh] overflow-y-auto">
          {summariesData[subSectionIndex]?.summary_text}
        </div>
      </div>
    </div>
  );
};

export default Summaries;
