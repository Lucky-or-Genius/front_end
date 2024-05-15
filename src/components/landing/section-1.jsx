import React from "react";
import { motion } from "framer-motion";

const Section1 = () => {
  return (
    <div className="w-full flex bg-[#0B0B0F] items-center px-4 py-28 flex md:gap-8 gap-4 flex-col">
<motion.h1
  className="text-white font-bold text-xl md:text-[64px]"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.3, ease: "easeInOut", duration: 2 }}
  viewport={{ once: false }}
>
  Verify lifelong reputations instantly.
</motion.h1>

<motion.span
  className="text-[#9CA3AF] max-w-[820px] font-semibold text-base md:text-xl text-center my-6"
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, ease: "easeInOut" }}
  viewport={{ once: false }}
>
  <strong>Reputations should be built</strong> up slowly and verified quickly. Lucky or Genius uses AI to identify, track and scores all forecasts extracted from any online text, audio or video content, based on their accuracy. The forecasters are graded based on the quality of their predictions and then ranked on our leaderboard for instant comparison.
</motion.span>

<div className="relative mb-8 mt-6">
  <motion.img
    src="/Leaderboards.png"
    alt="Leaderboards visual representation"
    className="w-full h-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.7, ease: "easeInOut", duration: 0.5 }}
    viewport={{ once: false }}
  />
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
</div>

<motion.h1
  className="text-white font-bold text-xl md:text-[64px] mt-12 mb-6"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.3, ease: "easeInOut", duration: 2 }}
  viewport={{ once: false }}
>
  The alpha is in the details.
</motion.h1>

<motion.div
  className="text-[#9CA3AF] max-w-[820px] font-semibold text-base md:text-xl text-center mb-8"
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, ease: "easeInOut" }}
  viewport={{ once: false }}
>
<strong>Don’t listen to the weatherman’s</strong> sports picks. Our proprietary AI automatically identifies, categorizes and shows you domains of expertise for every forecaster. </motion.div>

<div className="relative mb-4">
  <motion.img
    src="/profile2.jpg"
    alt="Profile visual representation"
    className="w-full h-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.5, ease: "easeInOut", duration: 0.5 }}
    viewport={{ once: false }}
  />
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
</div>
        
    </div>
  );
};

export default Section1;
