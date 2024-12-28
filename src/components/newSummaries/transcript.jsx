import React from "react";

const Transcript = ({ transcriptData }) => {
  return (
    <div className="w-full flex gap-4 flex-col h-full overflow-y-auto px-4 pb-24">
      {transcriptData.map((item, index) => (
        <div
          className={`${
            index % 2 === 0 ? "bg-[#ffffff10]" : "bg-[#ffffff20]"
          } w-full  rounded-lg p-4 flex flex-col gap-4`}
          key={index}
        >
          <div className="flex justify-between w-full items-center flex-wrap gap-4">
            <div className="flex gap-2 items-center">
              <img
                src={item?.image_url}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
              <span className="font-raleway text-white text-lg">
                {item?.user_name}
              </span>
            </div>
            <span className="bg-[#ffffff30] rounded-full px-2 text-[#ffffff70] flex items-center font-poppins font-[500] h-fit">
              {item?.time_range}
            </span>
          </div>
          <span className="font-poppins text-white">
            {item?.labelled_segments}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Transcript;
