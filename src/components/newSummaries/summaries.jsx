import React, { useState } from "react";
import { motion } from "framer-motion";

const Summaries = ({ summariesData }) => {
  const [subSectionIndex, setSubSectionIndex] = useState(0);

  return (
    <div className="w-full h-full md:h-[70dvh] overflow-y-hidden flex flex-col gap-6 justify-between ">
      {summariesData.length > 1 && (
        <div className="w-full overflow-y-auto grid grid-col-1 md:grid-cols-2 gap-2 h-[35dvh] px-2 content-stretch">
          {summariesData.map((summary, index) => (
            <div
              key={index}
              className="bg-[#ffffff20] border border-[#ffffff20] hover:border-primary400 transition-all ease-in-out rounded-lg p-4 cursor-pointer flex flex-col"
              onClick={() => setSubSectionIndex(index)}
            >
              <span className="bg-primary rounded-full px-2 text-white font-poppins w-fit">
                {summary?.time}
              </span>
              <span className="line-clamp-2 w-full font-poppins text-white pt-2">
                {summary?.summary_title}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex gap-2 h-full md:h-[35dvh] flex-col md:flex-row px-2 ">
        <div className="h-[35dvh] w-full md:w-1/2">
          <iframe
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
            title="Yt"
            alt="YT"
            src={`https://youtube.com/embed/${summariesData[subSectionIndex]?.youtube_id}?start=${summariesData[subSectionIndex]?.youtube_start_time}`}
          />
        </div>
        <motion.div
          key={subSectionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 10,
            },
          }}
          exit={{ opacity: 0, y: 20 }}
          className="text-lg md:text-2xl bg-[#ffffff10] text-[#ffffff] font-poppins p-4 rounded-lg h-fit md:h-[35dvh] md:overflow-y-auto w-full md:w-1/2 border border-gray-400 flex flex-col"
        >
          <div className="flex w-full gap-4 items-center mb-4">
            <span className="text-white bg-[#ffffff20] w-fit rounded-lg px-2 font-bold font-raleway ">
              Summary
            </span>
            <span className="bg-primary rounded-lg px-3 text-white font-poppins w-fit">
              {summariesData[subSectionIndex]?.time}
            </span>
          </div>
          <span className="w-full">
            {summariesData[subSectionIndex]?.summary_text}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Summaries;
