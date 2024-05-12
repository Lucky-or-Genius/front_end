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
        transition={{ delay: 0.5, ease: "easeInOut", duration: 2 }}
        viewport={{ once: false }}
      >
        Individual and market wisom.
      </motion.h1>
      <motion.span
        className="text-[#5D636E] max-w-[820px] font-semibold pb-6 text-base md:text-xl text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
      <strong>Instantly see and compare</strong> forecasts made by public figures to real betting lines found on active prediction markets.
      When we say we want to make words matter, we mean it. Compare the sharpest and most incentivised markets to the predictions of your favourite influencers.
      </motion.span>

      <ScrollContainer
        children={
          <img src="/markets.png" alt="screen" className="w-[40rem] h-full" />
        }
      />
    </div>
  );
};

export default Section6;
