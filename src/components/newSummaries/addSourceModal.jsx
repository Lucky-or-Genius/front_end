import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

import Modal from "../common/modal";
import useOutsideClick from "../../hooks/useOutsideClick";
import { addSource } from "../../services/summaries.services";
import { isValidYouTubeUrl } from "../../utils/helpers";

const AddSourceModal = ({ setShowModal, setUrl, url, setNotification }) => {
  const modalRef = useRef(null);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setUrl(e.target.value);
    setError("");
  };

  useOutsideClick({
    ref: modalRef,
    onOutsideClick: () => setShowModal(false),
  });

  const handleAddSource = async () => {
    if (url === "") {
      setError("Please enter a URL");
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    const params = {
      url: url,
    };

    try {
      const res = await addSource(params);
      if (res.status === 201) {
        setNotification(true);
        setShowModal(false);
      } else {
        toast.error("Error in adding source");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in adding source");
    }
  };

  return (
    <Modal>
      <div
        className="bg-primary/80 border border-white max-w-[500px] md:w-full w-[300px] p-4 rounded-lg flex flex-col gap-4"
        ref={modalRef}
      >
        <span className="font-raleway text-white font-semibold text-xl">
          Add Youtube URL
        </span>

        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={handleInput}
          className="w-full text-primary400 outline-none placeholder:text-[#ffffff80] bg-transparent border border-[#ffffff80] rounded-lg px-4 py-2 text-base font-poppins"
        />
        {error && (
          <span className="text-red-500 text-sm font-poppins">{error}</span>
        )}
        <div className="w-full flex justify-end">
          <button
            onClick={handleAddSource}
            className="border border-white px-4 py-2 font-semibold active:scale-95 rounded-md text-sm md:text-base bg-[#203955] text-white transition-all ease-in-out font-raleway"
          >
            ADD SOURCE
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSourceModal;
