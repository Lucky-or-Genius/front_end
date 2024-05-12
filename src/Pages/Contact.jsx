import React from "react";

const Contact = () => {
  return (
    <div className="h-screen bg-[#0B0B0F] w-full px-4 md:px-20 py-12 flex justify-center">
      <div className="md:w-4/5 md:h-[90vh] md:max-h-[900px] w-full border-2 flex-col md:flex-row  rounded-3xl flex p-6 gap-6 border-[#181818]">
        <div className="w-3/5 hidden md:flex">
          <img
            src="/contact-banner.png"
            alt=""
            className="w-full h-full object-cover rounded-2xl"
            width={100}
            height={200}
          />
        </div>
        <div className="w-full md:w-2/5 flex flex-col gap-8 justify-center">
          <div className="text-white font-semibold">Contact Us</div>
          <span className="text-[#545454]">
            Complete the interest form, our team members will try to connect
            with in 24 hours
          </span>
          <form action="" className="flex flex-col justify-between gap-4">
            <input
              type="text"
              className="rounded-lg p-2 bg-transparent border-2 border-[#AEAEAE80] bg-[#181818] text-white"
              placeholder="Enter your full name "
            />
            <input
              type="email"
              className="rounded-lg p-2 bg-transparent border-2 border-[#AEAEAE80] bg-[#181818] text-white"
              placeholder="Enter your email id"
            />
            <input
              type="phone"
              className="rounded-lg p-2 bg-transparent border-2 border-[#AEAEAE80] bg-[#181818] text-white"
              placeholder="Enter Phone Number"
            />
            <input
              type="text"
              className="rounded-lg p-2 bg-transparent border-2 border-[#AEAEAE80] bg-[#181818] text-white"
              placeholder="Company name (optional)"
            />
            <textarea
              placeholder="Write your message in details"
              className="rounded-lg p-2 bg-transparent border-2 border-[#AEAEAE80] bg-[#181818] text-white"
            />
          </form>
          <button className="w-full text-white bg-[#4B6CC2] md:bg-[#181818] p-2 rounded-lg">
            Submit Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
