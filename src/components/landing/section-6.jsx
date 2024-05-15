import React from "react";
import { motion } from "framer-motion";
import ScrollContainer from "./container-scroll";

const Section6 = () => {
  return (
    <div className="w-full bg-[#0B0B0F] justify-center px-4 py-28 md:px-20 items-center flex gap-8 flex-col">
      <motion.h1
        className="text-white font-bold text-xl pb-6 md:text-[64px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, ease: "easeInOut", duration: 2 }}
        viewport={{ once: false }}
      >
        Individual and market wisom.
      </motion.h1>
      <motion.span
        className="text-[#9CA3AF] max-w-[820px] font-semibold pb-6 text-base md:text-xl text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
      <strong>Instantly see and compare</strong> forecasts made by public figures to real betting lines found on active prediction markets.
      When we say we want to make words matter, we mean it. See how forecasts made by your favorite influencers stack up against the sharpest and most incentivised markets.
      </motion.span>

      <div className="relative mb-8 mt-6">
  <motion.img
    src="/markets2.png"
    alt="Leaderboards visual representation"
    className="w-full h-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.7, ease: "easeInOut", duration: 0.5 }}
    viewport={{ once: false }}
  />
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
</div>

    </div>
  );
};

export default Section6;
