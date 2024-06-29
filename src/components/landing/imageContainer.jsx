import React from "react";
import { motion } from "framer-motion";

const imageContainer = () => {
  return (
    <div className="h-screen w-full p-6 lg:p-16 bg-black flex justify-center items-center">
      <motion.img
        src="/images/future.webp"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 3 }}
        viewport={{ once: false }}
        alt="future_img"
        className="lg:w-4/5 w-full h-fit object-cover opacity-50 mask-image-radial-fade"
        style={{
          maskImage:
            "radial-gradient(circle, rgb(0, 0, 0), transparent 60%, transparent 30%)",
        }}
      />
    </div>
  );
};

export default imageContainer;
