import React from "react";
import { motion } from "framer-motion";

const Section2 = () => {
  return (
    <div className="w-full flex bg-[#0B0B0F] bg-gradient-to-b from-[#0F1014] items-center px-4 py-14 md:px-20 flex gap-8 flex-col"> {/* Reduced py-28 to py-14 */}
      <div className="w-full bg-gradient-to-b from-[#0F1014] to-[#0B0B0F] px-4 py-12 md:px-20 flex flex-col items-center"> {/* Adjusted py-16 to py-12 */}
        <motion.h1
          className="text-white font-bold text-xl md:text-[50px] mt-8 mb-8" // Adjusted mt and mb for even spacing
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, ease: "easeInOut", duration: 2 }}
          viewport={{ once: false }}
        >
          Never miss an actionable insight.
        </motion.h1>

        <motion.span
          className="text-[#9CA3AF] max-w-[820px] font-semibold text-base md:text-xl text-center my-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
          <strong>Lucky or Genius actively scans</strong> content across all major media platforms, 24/7. Set your profile to immediately receive alerts when new insights of relevance to you are found.
        </motion.span>

        <motion.div
          className="max-w-screen-xl w-full grid md:grid-cols-4 grid-cols-2 text-white gap-4 text-4xl my-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
          <div className="flex items-center space-x-2">
            <img src="twitter.png" alt="Twitter" className="h-16 w-16" />
            <span className="font-semibold text-[#9CA3AF]">Twitter</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="youtube_logo.png" alt="YouTube" className="h-16 w-16" />
            <span className="font-semibold text-[#9CA3AF]">YouTube</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="reddit.png" alt="Reddit" className="h-16 w-16" />
            <span className="font-semibold text-[#9CA3AF]">Reddit</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="spotify.png" alt="Spotify" className="h-16 w-16" />
            <span className="font-semibold text-[#9CA3AF]">Spotify</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Section2;
