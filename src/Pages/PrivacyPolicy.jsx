import React from "react";

import Navbar from "../components/common/navbar/navbar";
import { PrivacyPolicy } from "../utils/constant";
import Footer from "../components/landing/footer";
const Privacy = () => {
  return (
    <div className="bg-[#0B0B0F] flex flex-col w-full">
      <Navbar />
      <div className="bg-[#0B0B0F] min-h-screen px-4 md:px-12 py-6 flex items-center w-full flex-col gap-6">
        <span className="text-3xl font-raleway md:text-5xl font-semibold text-white">
          Privacy Policy
        </span>
        <div className="text-white w-full max-w-5xl flex flex-col gap-4 mt-6">
          {PrivacyPolicy.map((section, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl font-raleway md:text-2xl font-bold mb-2">
                {section.section}
              </h2>
              {section.subsections ? (
                <div className="pl-4">
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="mb-2">
                      {subsection.title && (
                        <h3 className="text-lg font-raleway text-primary400 font-semibold mb-1">
                          {subsection.title}
                        </h3>
                      )}
                      <p className="text-sm md:text-base font-poppins text-gray-300">
                        {subsection.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm md:text-base font-poppins text-gray-300">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
