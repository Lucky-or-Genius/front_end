import React from "react";
import { motion } from "framer-motion";

const Section1 = () => {
  return (
    <div className="w-full flex bg-[#0B0B0F] items-center px-4 py-28 flex md:gap-6 gap-4 flex-col">
      <motion.h1
        className="text-white font-bold text-xl md:text-[40px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        Verify lifelong reputations instantly.
      </motion.h1>

      <motion.span
        className="text-[#9CA3AF] max-w-[720px] font-[400] text-sm md:text-base text-center my-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <strong>Reputations should be built</strong> up slowly and verified
        quickly. AI is used to track and score all forecasts extracted from any
        digital medium based on their accuracy.
      </motion.span>

      <div className="relative mb-8 mt-6 flex w-full justify-center items-center flex-col">
        <motion.img
          src="/fixed_leaderboard.png"
          alt="Leaderboards visual representation"
          className="w-2/5 h-auto rounded-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, ease: "easeInOut", duration: 0.5 }}
          viewport={{ once: false }}
        />
        {/* <div className="absolute top-0 left-1/2 w-2/5 h-full bg-gradient-to-b from-transparent to-black opacity-50 rounded-lg"></div> */}
      </div>

      <motion.h1
        className="text-white font-bold text-xl md:text-[40px] mt-12 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        The alpha is in the details.
      </motion.h1>

      <motion.div
        className="text-[#9CA3AF] max-w-[720px] font-[400] text-sm md:text-base text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <strong>Don’t listen to the weatherman’s</strong> sports picks. Our
        proprietary AI automatically identifies, categorizes and shows you
        domains of expertise for every forecaster.{" "}
      </motion.div>

      <div className="relative mb-4 flex w-full justify-center items-center flex-col">
        <motion.img
          src="/profile2.jpg"
          alt="Profile visual representation"
          className="w-2/5 h-auto rounded-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, ease: "easeInOut", duration: 0.5 }}
          viewport={{ once: false }}
        />
        {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div> */}
      </div>
    </div>
  );
};

export default Section1;
