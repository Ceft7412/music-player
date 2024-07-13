import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion } from "framer-motion";

export default function ModalUpload() {
  const modalVariant = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 120,
      },
    },
  };
  return (
    <>
      <div className="modal-upload">
        <div className="modal-upload__flex">
          <div className="modal-upload__header">
            <span>Upload</span>
            <div className="modal-upload__close-icon">
              <CloseRoundedIcon fontSize="small" />
            </div>
          </div>
          <div className="modal-upload__body">
            <div className="modal-upload__drag"></div>
          </div>
        </div>
      </div>
    </>
  );
}
