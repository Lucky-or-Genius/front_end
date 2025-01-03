import React from "react";

import Navbar from "../components/common/navbar/navbar";
import { Faqs } from "../utils/constant";
import Accordion from "../components/common/accordion";
import Footer from "../components/landing/footer";

const FAQ = () => {
  return (
    <div className="bg-[#0B0B0F] flex flex-col w-full">
      <Navbar />
      <div className="bg-[#0B0B0F] min-h-screen px-4 md:px-12 py-6 flex items-center w-full flex-col gap-6 pb-12">
        <span className="text-3xl md:text-5xl font-semibold text-white">
          FAQ's
        </span>
        <div className=" 2md:w-4/5">
          {Faqs.map((faq, index) => (
            <div className="" key={index}>
              <Accordion
                Heading={faq.title}
                className={"text-white font-poppins"}
              >
                {faq.content}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
