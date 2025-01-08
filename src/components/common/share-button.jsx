import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { LuShare, LuX, LuCopy } from "react-icons/lu";

import Modal from "./modal";
import toast from "react-hot-toast";

const ShareLinkModal = ({ url }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Generic share button that uses the Web Share API if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        toast.success("Link copied!");
        await navigator.share({
          url,
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      copyLink();
    }
  };

  // Fallback to copying the link
  const copyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied!");
      })
      .catch((err) => console.error("Could not copy link", err));
  };

  // Close the modal and reset the "copied" flag
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* BUTTON THAT OPENS THE MODAL */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-primary400  font-raleway flex gap-2 items-center font-[600] px-2 md:px-4 py-2 rounded-lg hover:bg-[#ffffff20] active:bg-[#ffffff40] hover:text-white transition-all ease-in-out border border-primary400"
      >
        <LuShare />
        <span className="hidden md:flex">Share</span>
      </button>

      {/* SHARE MODAL */}
      {isOpen && (
        <Modal>
          <div
            className="bg-primary/80 border border-white max-w-[400px] md:w-full relative w-[300px] p-4 rounded-lg flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner content click
          >
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-4 right-4 text-lg text-white"
              onClick={closeModal}
            >
              <LuX />
            </button>

            <h2 className="text-xl font-semibold mb-2 text-white">
              Share the Profile!
            </h2>

            {/* TWITTER */}
            <div className="flex items-center gap-2 mb-3 w-full justify-between">
              <TwitterShareButton
                url={url}
                className="hover:scale-105 active:scale-95 transition-all ease-in-out"
              >
                <TwitterIcon size={48} round />
              </TwitterShareButton>

              <FacebookShareButton
                url={url}
                className="hover:scale-105 active:scale-95 transition-all ease-in-out"
              >
                <FacebookIcon size={48} round />
              </FacebookShareButton>

              <LinkedinShareButton
                url={url}
                className="hover:scale-105 active:scale-95 transition-all ease-in-out"
              >
                <LinkedinIcon size={48} round />
              </LinkedinShareButton>

              <WhatsappShareButton
                url={url}
                className="hover:scale-105 active:scale-95 transition-all ease-in-out"
              >
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>
            </div>

            {/* GENERAL (NATIVE) SHARE / COPY LINK */}
            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 border border-white px-4 py-2 font-semibold active:scale-95 rounded-md text-sm md:text-base bg-[#203955] text-white transition-all ease-in-out font-raleway"
            >
              <LuCopy />
              Copy Link
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShareLinkModal;
