import React from "react";
import { motion } from "framer-motion";

const Section2first = () => {
  return (
    <div className="w-full flex bg-[#0B0B0F] items-center px-4 py-28 flex md:gap-8 gap-4 flex-col">
      <motion.h1
        className="text-white font-bold text-xl md:text-[40px] mb-2 mt-8" // Added top margin here as well for balanced spacing
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        AI-powered prediction validation.
      </motion.h1>

      <motion.span
        className="text-[#5D636E] max-w-[520px] font- text-sm md:text-base text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <strong>Every prediction</strong> is individually scored using a
        combination of agentic LLMs and RAG systems. The justifications and
        reasoning are presented along with the original segment, clipped and
        available for instant replay.
      </motion.span>

      <div className="relative mb-4 mt-6 flex w-full justify-center items-center flex-col">
        {" "}
        {/* Wrapped in a div */}
        <motion.img
          src="/images/img-3.png"
          alt="Leaderboards visual representation"
          className="w-full md:w-2/5 h-auto rounded-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeInOut" }}
          viewport={{ once: false }}
        />
        {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-80"></div>{" "}
        Gradient overlay */}
      </div>
    </div>
  );
};

export default Section2first;
