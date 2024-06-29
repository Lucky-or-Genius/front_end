import React from "react";

const scrollMobile = () => {
  const items = [
    {
      src: "/images/fixed_leaderboard.png",
      heading: "Verify lifelong reputations instantly.",
      text: "Reputations should be built up slowly and verified quickly. AI is used to track and score all forecasts extracted from any digital medium based on their accuracy.",
    },
  ];
  return (
    <div className="w-full h-full p-6 bg-[#0B0B0F] flex md:hidden flex-col">
      {items.map((item, index) => (
        <div
          className="flex flex-col bg-black p-4 rounded-lg gap-4"
          key={index}
        >
          <img src={item.src} alt="board" className="" />
          <span className="text-[36px] text-white font-[600] leading-[1]">
            {item.heading}
          </span>
          <p className="text-slate-500 text-xs">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default scrollMobile;
