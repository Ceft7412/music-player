import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { RootContext } from "@/context/RootContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";

export default function ModalUpload() {
  const { modalUpload, setModalUpload } = useContext(RootContext);
  const [dragging, setDragging] = useState(false);

  const modalVariant = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.1,
        // type: "spring",
        // stiffness: 120,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.1,
      },
    },
  };

  const dragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const fileDrop = (e) => {
    setModalUpload(false);
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    console.log(files);
    // Handle the files here (upload, read, etc.)
  };
  const handleFileUpload = (e) => {
    setModalUpload(false);
    const files = e.target.files;
    console.log(files);
    // Handle the files here (upload, read, etc.)
  };

  return (
    <>
      <AnimatePresence>
        {modalUpload && (
          <motion.div
            className="modal-upload"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="modal-upload__flex">
              <div className="modal-upload__header">
                <span>Upload</span>
                <div
                  className="modal-upload__close-icon"
                  onClick={() => setModalUpload(false)}
                >
                  <CloseRoundedIcon fontSize="small" />
                </div>
              </div>
              <div
                className={`modal-upload__body ${dragging ? "dragging" : ""}`}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
              >
                <div className={`modal-upload__drag ${dragging ? "dragging" : ""}`}>
                  <span> Drag & Drop files here</span>
                </div>
                <span>OR</span>
                <div className="input-file">
                  <label htmlFor="input" className="input-file__input-true">
                    Browse File
                  </label>

                  <input
                    type="file"
                    id="input"
                    className="input-file__input-hide"
                    accept=".mp3, .wav, .flac"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
