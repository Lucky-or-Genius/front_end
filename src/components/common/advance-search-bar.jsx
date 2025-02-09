import React, { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const AdvanceSearchBar = ({
  setNameTerm,
  setPredictionTerm,
  predictionTerm,
  nameTerm,
}) => {
  const [option, setOption] = useState("Name");
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Name", "Prediction"];

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const handleInputChange = (e) => {
    if (option === "Name") {
      setNameTerm(e.target.value);
    } else {
      setPredictionTerm(e.target.value);
    }
  };

  return (
    <div className="relative">
      <div className="border border-primary400 rounded-full flex pl-4 items-center text-white text-poppins gap-2 w-full">
        <FiSearch className="text-lg" />
        <input
          type="search"
          className="bg-transparent outline-none font-poppins py-2 text-white text-xs w-full"
          placeholder="Search"
          value={option === "Name" ? nameTerm : predictionTerm}
          onChange={handleInputChange}
        />
        <div className="font-poppins bg-[#ffffff10] hover:bg-[#ffffff20] transition-all ease-in-out p-2 rounded-r-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-xs"
          >
            {option || "Select"}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-2 w-40 bg-[#ffffff20] backdrop-blur rounded-lg shadow-lg overflow-hidden z-50"
              >
                {options.map((opt) => (
                  <motion.button
                    key={opt}
                    onClick={() => {
                      setOption(opt);
                      setNameTerm("");
                      setPredictionTerm("");
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#ffffff10] text-gray-200"
                    whileTap={{ scale: 0.98 }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSearchBar;
