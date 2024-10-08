import React from "react";
import Accordion from "../common/accordion";

const Evidences = ({ data }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {Object.entries(data).map(([key, item]) => (
        <Accordion Heading={item.title} key={key}>
          <div className="flex gap-4 flex-col">
            <div className="bg-primary p-4 rounded-md gap-2 flex flex-col">
              <span className="text-[#ffffff80] md:text-xl font-semibold font-raleway ">
                Summary
              </span>
              <p className="text-white md:text-lg font-poppins">
                {item?.conclusion}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.summary?.map((summary, index) => (
                <div
                  className="flex flex-col justify-between border border-[#ffffff30] rounded-lg p-4 gap-4 bg-[#ffffff10]"
                  key={index}
                >
                  <div className="flex flex-col gap-4">
                    <div className="">
                      <span className="text-[#ffffff80]  md:text-xl font-semibold font-raleway ">
                        Key Point
                      </span>
                      <p className="text-white font-poppins pt-2">
                        {summary?.key_point}
                      </p>
                    </div>
                    <div className="">
                      <span className="text-[#ffffff80]  md:text-xl font-semibold font-raleway ">
                        Explanation
                      </span>
                      <p className="text-white font-poppins pt-2">
                        {summary?.details}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#ffffff30] pt-4 flex flex-col">
                    <span className="text-[#ffffff80] md:text-lg font-semibold font-raleway">
                      Sources:
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {summary.source_ids?.map((sourceId, idx) => {
                        const source = item.sources[sourceId];
                        return (
                          source?.url !== undefined &&
                          source?.title !== undefined && (
                            <a
                              href={source?.url}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-[#ffffff20] text-primary400 px-2 py-1 rounded-md font-poppins text-sm line-clamp-3 "
                              key={idx}
                            >
                              {source?.title}
                            </a>
                          )
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Accordion>
      ))}
    </div>
  );
};

export default Evidences;
