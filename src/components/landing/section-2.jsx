import React from "react";
import { motion } from "framer-motion";

const Section2 = () => {
  return (
    <div className="w-full bg-[#0B0B0F] items-center px-4 py-28 md:px-20 flex gap-8 flex-col">
      <motion.h1
        className="text-white font-bold text-xl md:text-[64px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, ease: "easeInOut", duration: 2 }}
        viewport={{ once: false }}
      >
        The alpha is in the details.
      </motion.h1>

      <motion.span
        className="text-[#5D636E] max-w-[820px] font-semibold text-base md:text-xl text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <strong>Don’t listen to the weatherman’s</strong> sports picks. Compare expertise and past performance by subject area, timeframes & other variables to evaluate credibility.
        Wherever the data is, whichever platform, we will extract it and validate it.
      </motion.span>

      <motion.div
        className="grid md:grid-cols-4 grid-cols-2 text-[#4788E6] gap-4 text-lg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <div className="flex items-center space-x-2">
          <img src="twitter.png" alt="Twitter" className="h-6 w-6" />
          <span className="font-semibold">X / Twitter </span>
        </div>
        <div className="flex items-center space-x-2">
          <img src="youtube_logo.png" alt="YouTube" className="h-6 w-6" />
          <span className="font-semibold">Youtube</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src="reddit.png" alt="Reddit" className="h-6 w-6" />
          <span className="font-semibold">Reddit</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src="spotify.png" alt="Spotify" className="h-6 w-6" />
          <span className="font-semibold">Spotify</span>
        </div>     
      </motion.div>

{/* 

      <motion.span
        className="text-[#5D636E] max-w-[820px] font-semibold text-base md:text-xl text-center mt-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <strong>Filter down countless forecasts</strong> down to those of use to you. Immediately receive alerts when new relevant insights are identified.
      </motion.span> */}
    </div>
  );
};

export default Section2;
