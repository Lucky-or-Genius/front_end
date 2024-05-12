import React from "react";

const About = () => {
  return (
    <div className="h-screen bg-[#0B0B0F] flex flex-col gap-8 p-4 md:p-16">
      <div className="flex gap-4 flex-col">
        <h2 className="text-white text-xl">Introduction</h2>
        <span className="text-[#545454]">
          Since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </span>
      </div>
      <div className="flex gap-4 flex-col">
        <h2 className="text-white text-xl">About product</h2>
        <span className="text-[#545454]">
          Since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </span>
      </div>
    </div>
  );
};

export default About;
