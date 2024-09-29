import React, { useState, useRef } from "react";
import toast from "react-hot-toast";

import Modal from "../common/modal";
import useOutsideClick from "../../hooks/useOutsideClick";
import { addSource } from "../../services/summaries.services";

const AddSourceModal = ({ setShowModal, setUrl, url, setNotification }) => {
  const modalRef = useRef(null);

  const handleInput = (e) => {
    setUrl(e.target.value);
  };

  useOutsideClick({
    ref: modalRef,
    onOutsideClick: () => setShowModal(false),
  });

  const handleAddSource = async () => {
    if (url === "") {
      toast.error("Please enter a URL");
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
    }
  };

  return (
    <Modal>
      <div
        className="bg-[#ffffff40] max-w-[500px] md:w-full w-[300px] p-4 rounded-lg flex flex-col gap-4"
        ref={modalRef}
      >
        <span className="font-raleway text-white font-semibold text-xl">
          Add Youtube URL
        </span>

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleInput}
          className="w-full outline-none placeholder:text-primary/70 bg-transparent border border-primary rounded-lg px-4 py-2 text-base font-poppins"
        />
        <div className="w-full flex justify-end">
          <button
            onClick={handleAddSource}
            className="border border-primary px-4 py font-semibold active:scale-95 rounded-md text-sm md:text-base hover:bg-primary hover:text-white transition-all ease-in-out font-raleway"
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSourceModal;
