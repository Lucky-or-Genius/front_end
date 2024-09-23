import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { cn } from "../../utils/cn";
import logoIcon from "../../assets/logo-icon.svg";
import { Button } from "./moving-border-button";

export const MacbookScroll = ({ src, showGradient, title }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest >= 0.4) {
        setCurrentSrc("/images/img-3.png");
      } else {
        setCurrentSrc(src);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, src]);

  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={ref}
      className="scroll-smooth  min-h-[100vh] md:min-h-full flex flex-col items-center md:py-20 justify-start flex-shrink-0 transform md:scale-100 scale-[0.8]"
    >
      <motion.div
        className="w-full pb-12 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 3 }}
      >
        <Link to="/login">
          <Button
            borderRadius="1.75rem"
            className="bg-[#0B0B0F] text-white font-bold border-neutral-200 dark:border-slate-800 font-raleway"
          >
            <IoLogIn className="text-[16px]" />
            Try Demo
          </Button>
        </Link>
      </motion.div>
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 3 }}
        viewport={{ once: false }}
        className="dark:text-white text-neutral-800 text-3xl font-bold mb-6 text-center font-poppins"
      >
        {title}
      </motion.h2>
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 3 }}
        viewport={{ once: false }}
        className="text-[#9CA3AF] text-sm md:text-base font-normal mb-20 text-center max-w-[720px] font-raleway px-4 "
      >
        Lucky or Genius transforms online influence with AI-driven
        accountability, verifying forecasts against real-world events and
        issuing accurate, objective scores enabling instant comparison
      </motion.h2>
      {/* Lid */}
      <Lid
        imgSrc={"/images/img-3.png"}
        scaleX={isMobile ? 1.15 : 1.2}
        scaleY={isMobile ? 1.55 : 0.6}
        rotate={isMobile ? -50 : -28}
      />
      {/* Base area */}
      <div className="md:h-[16rem] h-[14rem] w-[22rem] md:w-[32rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
        {/* above keyboard bar */}
        <div className="md:h-10 h-6 w-full relative">
          <div className="absolute inset-x-0 mx-auto w-[80%] h-4 bg-[#050505]" />
        </div>
        <div className="flex relative">
          <div className="mx-auto w-[10%] overflow-hidden  h-full">
            <SpeakerGrid />
          </div>
          <div className="mx-auto w-[80%] h-full">
            <Keypad />
          </div>
          <div className="mx-auto w-[10%] overflow-hidden  h-full">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-3xl rounded-tl-3xl" />
        {showGradient && (
          <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F] to-transparent z-50"></div>
        )}
      </div>
    </div>
  );
};

export const Lid = ({ scaleX, scaleY, rotate, imgSrc }) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="md:h-[12rem] h-[10rem] w-[22rem] md:w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
          }}
          className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
        >
          <span className="text-white w-[24px]">
            <img
              alt=""
              src={logoIcon}
              width={40}
              height={40}
              className="w-full h-full"
            />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: 0,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="md:h-96 h-[10rem] w-[22rem] md:w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
      >
        {/* <div className="relative inset-0 bg-[#272729] rounded-lg" /> */}
        <motion.img
          src={"/images/img1.png"}
          alt="aceternity logo"
          className={`object-fit h-full w-full`}
        />
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="w-[40%] mx-auto h-32  rounded-xl my-1"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="h-full rounded-md bg-[#050505] mx-1 p-1">
      {/* First Row */}
      <Row>
        <KBtn
          className="md:w-10 w-[2rem] items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        ></KBtn>
        <KBtn></KBtn>

        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
      </Row>

      {/* Second row */}
      <Row>
        <KBtn></KBtn>

        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn
          className="md:w-10 w-[2rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        ></KBtn>
      </Row>

      {/* Third row */}
      <Row>
        <KBtn
          className="md:w-10 w-[2rem] items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        ></KBtn>
        <KBtn></KBtn>

        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
      </Row>

      {/* Fourth Row */}
      <Row>
        <KBtn
          className="md:w-[2.8rem] w-[2.4rem] items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        ></KBtn>
        <KBtn></KBtn>

        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn
          className="md:w-[2.85rem] w-[1.55rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        ></KBtn>
      </Row>

      {/* Fifth Row */}
      <Row>
        <KBtn
          className="md:w-[3.65rem] w-[3rem] items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        ></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn>
        <KBtn></KBtn> <KBtn></KBtn>
        <KBtn
          className="md:w-[3.65rem] w-[2rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        ></KBtn>
      </Row>

      {/* sixth Row */}
      <Row>
        <KBtn
          className=""
          childrenClassName="h-full justify-between py-[4px]"
        ></KBtn>
        <KBtn
          className=""
          childrenClassName="h-full justify-between py-[4px]"
        ></KBtn>
        <KBtn
          className=""
          childrenClassName="h-full justify-between py-[4px]"
        ></KBtn>
        <KBtn
          className="md:w-8 w-[1.5rem]"
          childrenClassName="h-full justify-between py-[4px]"
        ></KBtn>
        <KBtn className="md:w-[8.2rem] w-[4rem]"></KBtn>
        <KBtn
          className="md:w-8 w-[1.5rem]"
          childrenClassName="h-full justify-between py-[4px]"
        ></KBtn>
        <KBtn
          className=""
          childrenClassName="h-full justify-between py-[4px]"
        ></KBtn>
        <div className="md:w-[4.9rem] w-[3.9rem] mt-[2px] h-6 p-[0.5px] rounded-[4px] flex flex-col justify-end items-center">
          <KBtn className="w-6 h-3"></KBtn>
          <div className="flex">
            <KBtn className="w-6 h-3"></KBtn>
            <KBtn className="w-6 h-3"></KBtn>
            <KBtn className="w-6 h-3"></KBtn>
          </div>
        </div>
      </Row>
    </div>
  );
};
export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}) => {
  return (
    <div
      className={cn(
        "md:p-[0.5px] p-0 rounded-[4px]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white"
      )}
    >
      <div
        className={cn(
          "md:h-6 h-[1rem] md:w-6 w-[1rem] bg-[#0A090D] rounded-[3.5px] flex items-center justify-center",
          className
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "text-neutral-200 text-[5px] w-full flex justify-center items-center flex-col",
            childrenClassName,
            backlit && "text-white"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Row = ({ children }) => {
  return (
    <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="flex px-[0.5px] gap-[2px] mt-2 h-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

export const OptionKey = ({ className }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
};
