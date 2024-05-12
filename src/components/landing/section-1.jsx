import React from "react";
import { motion } from "framer-motion";

const Section1 = () => {
  return (
    <div className="w-full flex bg-[#0B0B0F] items-center px-4 py-28 flex md:gap-8 gap-4 flex-col">
      <motion.h1
        className="text-white font-bold text-xl md:text-[64px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, ease: "easeInOut", duration: 2 }}
        viewport={{ once: false }}
      >
        Verify lifelong reputations instantly.
      </motion.h1>
    
      <motion.span
        className="text-[#5D636E] max-w-[820px] font-semibold text-base md:text-xl text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <strong>Reputations should be built</strong> up slowly and verified quickly. Using proprietary deep Ai systems, we identify, extract and score forecasts (past & present). Based on historic accuracy, we rank influencers on our leaderboards for instant comparison.
      </motion.span>

      <motion.img
        src="/Leaderboards.jpg"
        alt="Leaderboards visual representation"
        className="mb-8"  // Increased margin bottom for better spacing
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.1, ease: "easeInOut", duration: 0.5 }}
        viewport={{ once: false }}
      />

      <motion.div
        className="text-[#5D636E] max-w-[820px] font-semibold text-base md:text-xl text-center mb-8"  // Consistent vertical spacing
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        Predictions are systemically categorised. See where forecasters are strongest and weakest, and compare their performance to others.
      </motion.div>

      <motion.img
        src="/profile.jpg"
        alt="Profile visual representation"
        className="mb-4"  // Adds margin bottom
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, ease: "easeInOut", duration: 0.5 }}
        viewport={{ once: false }}
      />
        
    </div>
  );
};

export default Section1;
