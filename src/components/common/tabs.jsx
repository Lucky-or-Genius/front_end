import React, { useRef, useEffect, useState } from "react";

const Tabs = ({ items, className, defaultOpen }) => {
  const firstBtnRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState(defaultOpen ? 1 : 0);

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  return (
    <div className={`flex flex-col h-full ${className} w-full 2md:w-4/5`}>
      <div className="flex w-full flex-row min-h-14 bg-[#ffffff20] pt-2 px-2 rounded-xl font-raleway overflow-x-auto tab_subheading">
        {items.map((item, index) => (
          <button
            key={index}
            ref={index === 0 ? firstBtnRef : null}
            onClick={() => setSelectedTab(index)}
            className={`text-sm pt-3 pb-4 min-h-12 px-3.5 transition-all font-semibold rounded-t-lg rounded-x-lg duration-300 ease-in-out hover:text-[#ffffff80] ${
              selectedTab === index
                ? " text-white hover:text-white bg-primary"
                : "text-[#ffffff80] hover:bg-[#ffffff10]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="h-full pt-6">
        {items.map((item, index) => (
          <div
            className={`content h-full ${
              selectedTab === index ? "" : "hidden"
            }`}
            key={index}
          >
            <div className="h-full">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
