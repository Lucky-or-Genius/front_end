import React from "react";
import { MacbookScroll } from "../components/common/macbook-scroll";
import Section2 from "../components/landing/section-2";
import Section2first from "../components/landing/section-2-first";
import Section6 from "../components/landing/section-6";
import Section9 from "../components/landing/section-9";
import StickyScroll from "../components/landing/sticky-scroll";
import ImageContainer from "../components/landing/imageContainer";
import MobileScroll from "../components/landing/mob-scroll-conatiner";
import Navbar from "../components/common/navbar/navbar";
import "../styles/landingpage.css";

export default function LandingPage() {
  return (
    <div className="flex flex-col landing font-calibre">
      <Navbar />
      <div className="overflow-hidden bg-[#0B0B0F] w-full">
        <MacbookScroll
          title={
            <h1 className="md:text-[42px] text-[32px] md:leading-[1] leading-[2rem]">
              Where influence meets <span className="gradient-text">AI</span>{" "}
              accountability.
            </h1>
          }
          src={`/landing_3.png`}
          showGradient={true}
        />
      </div>
      <Section2first />
      <Section2 />
      <ImageContainer />
      <Section6 />
      <StickyScroll />
      <MobileScroll />
      <Section9 />
    </div>
  );
}
