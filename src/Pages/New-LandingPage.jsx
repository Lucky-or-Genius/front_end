import React from "react";
import { MacbookScroll } from "../components/common/macbook-scroll";
import Section1 from "../components/landing/section-1";
import Section2 from "../components/landing/section-2";
import Section2first from "../components/landing/section-2-first";
import Section3 from "../components/landing/section-3";
import Section4 from "../components/landing/section-4";
import Section5 from "../components/landing/section-5";
import Section6 from "../components/landing/section-6";
import Section7 from "../components/landing/section-7";
import Section8 from "../components/landing/section-8";
import Section9 from "../components/landing/section-9";
import { StickyScroll } from "../components/landing/sticky-scroll";
import "../styles/landingpage.css"; // Corrected import path

export default function LandingPage() {
  return (
    <div className="flex flex-col landing">
      <div className="overflow-hidden bg-[#0B0B0F] w-full -mt-[10rem] md:mt-0">
        <MacbookScroll
          title={
            <h1 className="md:text-[42px] text-[32px] md:leading-[6rem] leading-[2rem]">
              Where influence meets <span className="gradient-text">AI</span>{" "}
              accountability.
            </h1>
          }
          src={`/landing_2.png`}
          showGradient={false}
        />
      </div>
      <Section1 />
      <Section2 />
      <Section2first />
      <Section6 />
      <Section3 />
      {/* <Section4 />
      <Section5 /> */}
      {/* <Section7 /> */}

      <Section8 />
      <Section9 />
    </div>
  );
}
