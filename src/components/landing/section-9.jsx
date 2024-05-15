import React from "react";
import { motion } from "framer-motion";

const Section9 = () => {
  return (
    <div className="w-full flex bg-black items-center px-4 py-28 md:px-20 flex gap-8 flex-col">
      <motion.h1
        className="text-white font-bold text-xl md:text-[52px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, ease: "easeInOut", duration: 2 }}
        viewport={{ once: false }}
      >
        Enjoy a better signal to noise ratio.
      </motion.h1>
      <motion.span
        className="text-[#9CA3AF] max-w-[800px] font-semibold text-base md:text-xl text-center "
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <strong>We filter out the noise</strong>, spotlight value and only notify you when subjects of relevance to you are mentioned.
      </motion.span>
      <div className="">
        <button className="bg-[#1C1C1C] rounded-3xl text-white py-2 w-48 px-6 animate-bounce transition-all ease-in-out">
          Try it free
        </button>
      </div>

      <div className="w-full flex justify-center">
        <motion.img
          src="/laptop.png"
          alt=""
          className=""
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, ease: "easeInOut", duration: 0.5 }}
          viewport={{ once: false }}
        />
      </div>
    </div>
  );
};

export default Section9;
