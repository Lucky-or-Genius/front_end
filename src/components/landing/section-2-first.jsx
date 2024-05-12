import React from "react";
import { motion } from "framer-motion";

const Section2first = () => {
  return (
    <div className="w-full flex bg-[#0B0B0F] items-center px-4 py-28 flex md:gap-8 gap-4 flex-col">
      <motion.h1
        className="text-white font-bold text-xl md:text-[64px] mb-12" // Added margin-bottom here
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, ease: "easeInOut", duration: 2 }}
        viewport={{ once: false }}
      >
        Browse all predictions past and present.
      </motion.h1>

      <motion.span
        className="text-[#5D636E] max-w-[820px] font-semibold text-base md:text-xl text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
Compare the opinions of different individuals and find new perspectives based on objective accuracy. We believe that people should put their money where their mouth is. So we have put peoples words to the test, whether they intended it or not. 
      </motion.span>

      <motion.img
        src="/predictions_landing.png"
        alt="Leaderboards visual representation"
        className="mb-8"  // Increased margin-bottom for better spacing
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.1, ease: "easeInOut", duration: 0.5 }}
        viewport={{ once: false }}
      />

      <motion.h1
        className="text-white font-bold text-xl md:text-[64px] mb-12 mt-8" // Added top margin here as well for balanced spacing
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, ease: "easeInOut", duration: 2 }}
        viewport={{ once: false }}
      >
        Ai based prediction validation.
      </motion.h1>

      <motion.span
        className="text-[#5D636E] max-w-[820px] font-semibold text-base md:text-xl text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
Prediction validation and grading is based on accuracy and timeframe with related real money betting markets identified when available. A combination of agentic LLM's and RAG systems combine to validate predictions. Evidence, reseach and derived Ai reasoning is presented for the user to explore and confirm for themselves.
      </motion.span>

      <motion.img
        src="/predictions_expanded2.jpg"
        alt="Leaderboards visual representation"
        className="mb-4"  // Adds margin bottom
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.1, ease: "easeInOut", duration: 0.5 }}
        viewport={{ once: false }}
      />
        
    </div>
  );
};

export default Section2first;
