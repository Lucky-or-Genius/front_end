"use client";

import React, { useEffect, useRef } from "react";

import { useInView } from "framer-motion";
import { cn } from "../../utils/cn";
import { useTopicStore } from "../../utils/store";

const FeatureTitle = ({ children, id, buttonText, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const setInViewTopic = useTopicStore((state) => state.setInViewTopic);
  const inViewStore = useTopicStore((state) => state.inViewTopic);

  useEffect(() => {
    if (isInView) setInViewTopic(id);
    if (!isInView && inViewStore === id) setInViewTopic(null);
  }, [isInView, id, setInViewTopic, inViewStore]);

  return (
    <div ref={ref} className="feature-title py-24 flex flex-col gap-4">
      <p
        className={cn(
          `text-3xl font-bold transition-colors`,
          isInView ? "text-white" : "text-neutral-700/50 "
        )}
      >
        {children}
      </p>
      {subtitle && subtitle !== "" && (
        <p
          className={cn(
            "text-base py-2 w-3/4",
            isInView ? "text-slate-400" : "text-neutral-700/50"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default FeatureTitle;
