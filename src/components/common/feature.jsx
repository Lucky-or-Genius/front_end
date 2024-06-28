import React from "react";
import { cn } from "../../utils/cn";

import { useTopicStore } from "../../utils/store";

const FeatureCard = ({ className, children, id }) => {
  const inViewStore = useTopicStore((state) => state.inViewTopic);

  return (
    <div
      className={cn(
        "absolute inset-0  h-full w-full rounded-3xl transition-opacity",
        inViewStore === id
          ? "active-card opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <div
        className={cn(
          "gradient absolute inset-0 origin-bottom-left rounded-3xl",
          className
        )}
      >
        {children}
      </div>
      {/* <button onClick={() => setFullScreenFeature(id)} className='show-me-btn absolute bg-black rounded-xl text-white bottom-6 right-6 px-4 py-2 shadow-md'>Show Me</button> */}
    </div>
  );
};

export default FeatureCard;

export const AirdropsCard = ({ id }) => {
  return (
    <FeatureCard id={id} className="bg-[#f8eddd]">
      <img
        src={"/images/fixed_leaderboard.png"}
        alt={`image for ${id}`}
        height={200}
        width={400}
        className="rounded-2xl w-full h-full"
      />
    </FeatureCard>
  );
};

export const WorldRecessionCard = ({ id }) => {
  return (
    <FeatureCard id={id} className="bg-[#fbebea]">
      <img
        src={"/images/Profile.jpg"}
        alt={`image for ${id}`}
        height={200}
        width={400}
        className=" rounded-2xl w-full h-full"
      />
    </FeatureCard>
  );
};

export const DenialCard = ({ id }) => {
  return (
    <FeatureCard id={id} className="bg-neutral-100">
      <image
        src={"/landing/Spendinglanding.webp"}
        alt={`image for ${id}`}
        height={400}
        width={400}
        className="aspect-square object-cover rounded-3xl w-full h-full"
      />
    </FeatureCard>
  );
};

export const DebateCard = ({ id }) => {
  return (
    <FeatureCard id={id} className="bg-neutral-100">
      <div className="grid grid-rows-2 w-full h-full p-3">
        <image
          src={
            "https://media1.tenor.com/m/sIBXbAf_oEcAAAAC/ref-with-yellow-cards-fifa18.gif"
          }
          alt={`image for ${id}`}
          height={150} // Adjust the height to create a rectangular image
          width={300} // Adjust the width to create a rectangular image
          className="object-cover w-full h-full rounded-3xl p-3"
        />
        <image
          src={
            "https://media1.tenor.com/m/RNSeUDgU4DMAAAAd/aki-and-pawpaw-money.gif"
          }
          alt={`image for ${id}`}
          height={150} // Adjust the height to create a rectangular image
          width={300} // Adjust the width to create a rectangular image
          className="object-cover w-full h-full rounded-3xl p-3"
        />
      </div>
    </FeatureCard>
  );
};

export const SmarterCard = ({ id }) => {
  return (
    <FeatureCard id={id} className="md:bg-neutral-100">
      <image
        src={"/landing/einstein3.jpg"}
        alt={`image for ${id}`}
        height={400}
        width={400}
        className="aspect-square object-cover rounded-3xl w-full h-full p-6"
      />
    </FeatureCard>
  );
};
