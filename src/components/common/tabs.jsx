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
      <div className="flex w-full flex-row  gap-4 border-b border-[#ffffff30] font-raleway overflow-x-auto tab_subheading">
        {items.map((item, index) => (
          <button
            key={index}
            ref={index === 0 ? firstBtnRef : null}
            onClick={() => setSelectedTab(index)}
            className={`text-sm py-3 px-3.5 border-b-2 hover:border-[#ffffff60] border-transparent transition-all ease-in-out hover:text-[#ffffff80] ${
              selectedTab === index
                ? " !border-white text-white hover:text-white"
                : "text-[#ffffff60]"
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
