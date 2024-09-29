import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const CircularProgress = ({ value, max, size = 32 }) => {
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-white opacity-20"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-white"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
        {value}
      </span>
    </div>
  );
};

const Notification = ({ url, setShowNotification }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowNotification(false);
    }
  }, [timeLeft, setShowNotification]);

  return (
    <div className="absolute bottom-6 right-0 fixed p-4 max-w-[500px] mx-6 border border-[#ffffff60] rounded-lg shadow-lg shadow-[#ffffff40] bg-primary font-raleway flex flex-col gap-2">
      <div className="w-full text-primary text-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h4 className="text-white text-sm font-semibold">Auto-close</h4>
          <CircularProgress value={timeLeft} max={30} size={32} />
        </div>
        <RxCross2
          className="p-2 bg-white text-primary rounded-full w-10 h-10 cursor-pointer"
          onClick={() => setShowNotification(false)}
        />
      </div>
      <span className="text-white md:text-lg font-semibold">{`The source ${url} has been added to the queue for processing. Our system will perform the following operations on the source:`}</span>

      <ol className="list-decimal px-4 text-[#ffffff80] text-sm md:text-base">
        <li className="">
          Identify the speakers in the video via face and voice print
          identification
        </li>
        <li className="">Create a labelled transcript with each speaker</li>
        <li className="">Identify and extract any predictions found</li>
        <li className="">Filter, categorise and refine predictions</li>
        <li className="">Validate and score all suitable predictions</li>
      </ol>

      <span className="text-primary400 font-semibold text-sm md:text-base">
        Typical processing time is 20-30 mins if the queue isn't full.
      </span>
    </div>
  );
};

export default Notification;
