import React from "react";
import { motion } from "framer-motion";

const Section3 = () => {
  return (
    <div className="w-full flex bg-[#0B0B0F] bg-gradient-to-b from-[#0F1014] items-center px-4 py-28 md:px-20 flex gap-8 flex-col relative">
      {/* Blurred and darkened background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/pipeline2.png)',
          filter: 'blur(10px) brightness(0.5)', // Adjust blur and brightness
          zIndex: -2, // Ensure the background is behind the overlay
        }}
      ></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Left gradient overlay */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to right, black, transparent 50%)' }}></div>

      {/* Right gradient overlay */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to left, black, transparent 50%)' }}></div>

      {/* Content on top of the background */}
      <div className="w-full flex items-center md:justify-between md:flex-row flex-col py-6 relative z-10">
        <motion.h1
          className="text-white font-bold text-xl md:text-[52px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
          Patent pending AI system.
        </motion.h1>
        <motion.span
          className="text-[#9CA3AF] max-w-[420px] font-semibold text-base md:text-xl text-center md:text-start"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
          Our <strong>AI-based architecture</strong> is an end-to-end system, featuring influencer identification across mediums (audio, video, image, etc.), deep contextual prediction extraction, and systemic RAG-based, evidentiary validation.
        </motion.span>
      </div>

      <div className="w-full flex justify-center relative z-10">
  <motion.img
    src="/patent.png"
    alt="Pipeline Diagram"
    className="w-full h-auto rounded-lg"
    style={{ filter: 'blur(0px) brightness(0.5)', transform: 'scale(1)' }} // Apply blur, darken, and zoom
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.7, ease: "easeInOut", duration: 0.5 }}
    viewport={{ once: false }}
  />
</div>
    </div>
  );
};

export default Section3;
