import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { RootContext } from "@/context/RootContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";

export default function ModalUpload() {
  const { modalUpload, setModalUpload } = useContext(RootContext);
  console.log(modalUpload);
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
              <div className="modal-upload__body">
                <div className="modal-upload__drag"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
