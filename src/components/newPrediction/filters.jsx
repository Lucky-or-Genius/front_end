import React, { useState } from "react";

import { IoOptionsOutline, IoReloadOutline } from "react-icons/io5";
import { MdOutlinePhotoFilter, MdOutlineTopic } from "react-icons/md";
import Popper from "../common/popover";

const Filters = () => {
  const [activeButton1, setActiveButton1] = useState("");
  const [activeButton2, setActiveButton2] = useState("");

  const handleButton1Click = (buttonName) => {
    setActiveButton1(buttonName);
  };
  const handleButton2Click = (buttonName) => {
    setActiveButton2(buttonName);
  };

  const handleApply = () => {
    // fetchSortedCategory(activeButton);
  };

  return (
    <div className="flex gap-4 py-4">
      <span className="flex items-center gap-2 text-primary400 font-raleway font-[500]">
        Filters{" "}
        <IoOptionsOutline className="border border-primary400 rounded-full p-1 w-6 h-6" />
      </span>
      <div className="gap-2 flex font-raleway">
        <div className="">
          <Popper
            children={
              <div className="">
                <div className="">
                  <button
                    className={`True ${
                      activeButton1 === "True" ? "active" : ""
                    }`}
                    onClick={() => handleButton1Click("True")}
                  >
                    True
                  </button>
                  <button
                    className={`False ${
                      activeButton1 === "False" ? "active" : ""
                    }`}
                    onClick={() => handleButton1Click("False")}
                  >
                    False
                  </button>
                  <button
                    className={`ParticallyTrue ${
                      activeButton1 === "PARTIALLY TRUE" ? "active" : ""
                    }`}
                    onClick={() => handleButton1Click("PARTIALLY TRUE")}
                  >
                    Part True
                  </button>
                  <button
                    className={`Pending ${
                      activeButton1 === "Pending" ? "active" : ""
                    }`}
                    onClick={() => handleButton1Click("Pending")}
                  >
                    Pending
                  </button>
                </div>
                <button
                  className={`w-full flex justify-center items-center gap-2 text-white cursor-pointer active:border-2 border-white rounded-lg p-2 ${
                    activeButton1 === " " ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveButton1("");
                    //   fetchSortedCategory("");
                  }}
                >
                  Reset <IoReloadOutline />
                </button>
                <div className="apply">
                  <button className="apply-btn" onClick={() => handleApply()}>
                    Apply
                  </button>
                </div>
              </div>
            }
            trigger={
              <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
                Status <MdOutlinePhotoFilter />
              </button>
            }
          />
        </div>
        <div className="">
          <Popper
            children={
              <div className="">
                <div className="">
                  <button
                    className={`Economy ${
                      activeButton2 === "Economy" ? "active" : ""
                    }`}
                    onClick={() => handleButton2Click("Economy")}
                  >
                    Economy
                  </button>
                  <button
                    className={`Finance ${
                      activeButton2 === "Finance" ? "active" : ""
                    }`}
                    onClick={() => handleButton2Click("Finance")}
                  >
                    Finance
                  </button>
                  <button
                    className={`Politics ${
                      activeButton2 === "Politics" ? "active" : ""
                    }`}
                    onClick={() => handleButton1Click("Politics")}
                  >
                    Politics
                  </button>
                  <button
                    className={`SciTech ${
                      activeButton2 === "Sci %26 Tech" ? "active" : ""
                    }`}
                    onClick={() => handleButton2Click("Sci %26 Tech")}
                  >
                    Sci & Tech
                  </button>
                  <button
                    className={`Social ${
                      activeButton2 === "Social %26 Health" ? "active" : ""
                    }`}
                    onClick={() => handleButton2Click("Social %26 Health")}
                  >
                    Social & Health
                  </button>
                  <button
                    className={`Other ${
                      activeButton2 === "Other" ? "active" : ""
                    }`}
                    onClick={() => handleButton2Click("Other")}
                  >
                    Others
                  </button>
                </div>
                <button
                  className={`w-full flex justify-center items-center gap-2 text-white cursor-pointer active:border-2 border-white rounded-lg p-2 ${
                    activeButton2 === " " ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveButton2("");
                    // fetchSortedPrediction("");
                  }}
                >
                  Reset <IoReloadOutline />
                </button>
                <div className="apply" onClick={() => handleApply()}>
                  <button className="apply-btn">Apply</button>
                </div>
              </div>
            }
            trigger={
              <button className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]">
                Topic <MdOutlineTopic />
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
