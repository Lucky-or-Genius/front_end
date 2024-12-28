import React from "react";
import Navbar from "../components/common/navbar/navbar";
import { TermsOfService } from "../utils/constant";

const About = () => {
  return (
    <div className="bg-[#0B0B0F] flex flex-col w-full">
      <Navbar />
      <div className="bg-[#0B0B0F] min-h-screen px-4 md:px-12 py-6 flex items-center w-full flex-col gap-6">
        <span className="text-3xl md:text-5xl font-raleway font-semibold text-white">
          Terms & Conditions
        </span>
        <div className="text-white w-full max-w-5xl flex flex-col gap-4 mt-6">
          {TermsOfService.map((section, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl font-raleway md:text-2xl font-bold mb-2">
                {section.section}
              </h2>
              {section.subsections ? (
                <div className="pl-4">
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="mb-2">
                      <h3 className="text-lg font-semibold text-primary400 mb-1 font-raleway flex gap-4">
                        <span className="">
                          {" "}
                          {index + 1}.{subIndex + 1}
                        </span>
                        {subsection.title}
                      </h3>
                      <p className="text-xs md:text-sm font-poppins text-gray-300">
                        {subsection.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm md:text-base text-gray-300 font-poppins">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
