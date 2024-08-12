import React from "react";
import { motion } from "framer-motion";
import ScrollContainer from "./container-scroll";

const Section6 = () => {
  return (
    <div className="w-full bg-[#0B0B0F] justify-center px-4 py-28 md:px-20 items-center flex gap-8 flex-col">
      <motion.h1
        className="text-white font-bold text-xl pb-2 md:text-[40px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        Individual and market wisdom.
      </motion.h1>
      <motion.span
        className="text-[#9CA3AF] max-w-[520px] pb-6 text-sm md:text-base text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <strong>Instantly see and compare</strong> forecasts made by public
        figures to real betting lines found on active prediction markets. See
        how forecasts made by your favorite influencers stack up against the
        sharpest and most incentivized markets.
      </motion.span>
      <div className="relative mb-8 mt-6 flex w-full justify-center items-center flex-col">
        <motion.img
          src="/images/graph.svg"
          alt="Leaderboards visual representation"
          className=" w-full md:w-2/5 h-auto rounded-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
        {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-20 rounded-lg"></div> */}

        <style jsx>{`
          .animated-gradient-border {
            border-radius: 12px; /* Ensure border radius is applied */
            border-width: 8px;
            border-style: solid;
            border-image-slice: 1;
            border-image-source: linear-gradient(
              90deg,
              #ffffff,
              #d1d5db,
              #4a6edb
            );
            animation: gradient-animation 5s infinite linear;
          }

          @keyframes gradient-animation {
            0% {
              border-image-source: linear-gradient(
                90deg,
                #ffffff,
                #d1d5db,
                #4a6edb
              );
            }
            50% {
              border-image-source: linear-gradient(
                90deg,
                #4a6edb,
                #ffffff,
                #d1d5db
              );
            }
            100% {
              border-image-source: linear-gradient(
                90deg,
                #ffffff,
                #d1d5db,
                #4a6edb
              );
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Section6;
