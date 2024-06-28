import React from "react";
import { motion } from "framer-motion";

const Section9 = () => {
  return (
    <div className="w-full h-screen flex bg-black justify-center px-4 items-center md:px-20 gap-6 flex flex-col relative">
      <div
        className="absolute top-[3%] left-[10%] w-[80%] h-[80%] pointer-events-none bg-radial-pattern bg-left-center bg-8x8 opacity-80 mask-image-radial-fade"
        style={{ maskImage: "radial-gradient(rgb(0, 0, 0), transparent 50%)" }}
      ></div>
      <motion.h1
        className=" font-bold text-xl md:text-[40px] gradient-text pb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        Enjoy a better signal to noise ratio.
      </motion.h1>
      <motion.span
        className="text-[#9CA3AF] max-w-[700px] font-semibold text-sm md:text-base text-center "
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <strong>We filter out the noise</strong>, spotlight value and only
        notify you when subjects of relevance to you are mentioned.
      </motion.span>
      <div className="z-[9999]">
        <button className="bg-[#1C1C1C] rounded-3xl text-white border-white border-[1px] font-calibre py-[4px] shadow-small shadow-[#ffffff60] font-[500] w-[11rem] px-6 transition-all ease-in-out hover:bg-white hover:text-black">
          Try it free
        </button>
      </div>

      <div className="w-full flex flex-col justify-center relative">
        <motion.img
          src="/laptop.png"
          alt=""
          className="scale-[0.7]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, ease: "easeInOut", duration: 0.5 }}
          viewport={{ once: false }}
        />
      </div>
    </div>
  );
};

export default Section9;
