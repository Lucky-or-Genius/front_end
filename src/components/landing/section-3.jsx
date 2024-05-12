import React from "react";
import { motion } from "framer-motion";

const Section3 = () => {
  return (
    <div className="w-full flex bg-[#0B0B0F] bg-gradient-to-b from-[#0F1014]  items-center px-4 py-28 md:px-20 flex gap-8 flex-col">
      <div className=" w-full flex items-center md:justify-between md:flex-row flex-col py-6">
        <motion.h1
          className="text-white font-bold text-xl md:text-[52px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
          Patent pending Ai system.
        </motion.h1>
        <motion.span
          className="text-[#5D636E] max-w-[420px] font-semibold text-base md:text-xl text-center md:text-start "
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
Our <strong>Ai based architecture</strong> is an end to end system, featuring influencer identification across mediums (audio, video, image etc), deep contextual prediction extraction and systemic RAG based, evidentiary validation. The system is patent pending. 
        </motion.span>
      </div>

      <div className="w-full flex justify-center">
        <motion.img
          src="/diagram3.png"
          alt=""
          className=""
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, ease: "easeInOut", duration: 0.5 }}
          viewport={{ once: false }}
        />
      </div>
    </div>
  );
};

export default Section3;
