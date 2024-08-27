import React from "react";
import { cn } from "../../utils/cn";

import { useTopicStore } from "../../utils/store";

const FeatureCard = ({ className, children, id }) => {
  const inViewStore = useTopicStore((state) => state.inViewTopic);

  return (
    <div
      className={cn(
        "absolute h-full w-full transition-opacity flex items-center",
        inViewStore === id
          ? "active-card opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <div className={cn("absolute flex items-center right-0", className)}>
        {children}
      </div>
      {/* <button onClick={() => setFullScreenFeature(id)} className='show-me-btn absolute bg-black rounded-xl text-white bottom-6 right-6 px-4 py-2 shadow-md'>Show Me</button> */}
    </div>
  );
};

export default FeatureCard;

export const AirdropsCard = ({ id }) => {
  return (
    <FeatureCard id={id} className="relative overflow-hidden">
      <img
        src={"/images/l-7.png"}
        alt={`banner for ${id}`}
        height={400}
        width={400}
        className="w-full object-fit h-fit rounded-lg opacity-[0.8]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[50%] to-[#000000] to"></div>
    </FeatureCard>
  );
};

export const WorldRecessionCard = ({ id }) => {
  return (
    <FeatureCard id={id} className=" relative overflow-hidden">
      <img
        src={"/images/l-6.png"}
        alt={`banner for ${id}`}
        height={400}
        width={400}
        className=" w-full object-fit h-fit rounded-lg opacity-[0.8]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[50%] to-[#000000] to"></div>
    </FeatureCard>
  );
};

export const DenialCard = ({ id }) => {
  return (
    <FeatureCard id={id} className="relative overflow-hidden ">
      <img
        src={"/images/l-2.png"}
        alt={`banner for ${id}`}
        height={400}
        width={400}
        className="w-full object-fit h-fit rounded-lg opacity-[0.8]"
      />
      <div className="absolute inset-0 h-[1000px] bg-gradient-to-r from-transparent from-[50%] to-[#000000]"></div>
    </FeatureCard>
  );
};
