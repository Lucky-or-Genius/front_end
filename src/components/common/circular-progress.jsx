import React from "react";
import { motion } from "framer-motion";
import { preconnect } from "react-dom";

const CircularProgress = ({
  percentage,
  size = 80,
  strokeWidth = 36,
  isLoading,
}) => {
  // Calculate circle parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - ((percentage || 0) / 100) * circumference;

  // Loading animation variants
  const loadingCircleVariants = {
    loading: {
      strokeDashoffset: [circumference, 0],
      rotate: [0, 360],
      transition: {
        strokeDashoffset: {
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        },
        rotate: {
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        },
      },
    },
    idle: {
      strokeDashoffset,
      rotate: -90,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Drop shadow filter */}
      <svg width="0" height="0">
        <defs>
          <filter
            id="circular-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.6" />
          </filter>
        </defs>
      </svg>

      {/* Background circle */}
      <motion.svg
        width={size}
        height={size}
        style={{ filter: "url(#circular-shadow)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#ffffff20"
          strokeWidth={strokeWidth}
        />

        {/* Animated progress/loading circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isLoading ? "#ffffff10" : "#7394FF"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          variants={loadingCircleVariants}
          animate={isLoading ? "loading" : "idle"}
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>

      {/* Percentage text */}
      {!isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center flex-col group"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span className="text-3xl font-bold text-primary400 font-poppins group-hover:scale-110 transition-all ease-in-out">
            {percentage}%
          </span>
          <span className="text-lg font-semibold text-primary400 font-poppins">
            Accuracy
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default CircularProgress;
