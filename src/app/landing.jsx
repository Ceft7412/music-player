import { useContext } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Footer from "@/components/footer";
import ModalUpload from "@/components/ModalUpload";
import { RootContext } from "@/context/RootContext";

export default function Landing() {
  const { setModalUpload, modalUpload } = useContext(RootContext);

  const handleClose = () => {
    if (modalUpload) {
      setModalUpload(false);
    }
  };
  return (
    <>
      <div className="music">
        {/*  */}
        {/* column */}
        <div className="music__layout">
          {/*  */}
          {/* row */}
          <ModalUpload />
          <div className="row content" onClick={handleClose}>
            <div className="row__flex_row">
              <div className="row__flex_row_item row__flex_row_left"></div>
              <div className="row__flex_row_item row__flex_row_center"></div>
              <div className="row__flex_row_item row__flex_row_right">
                <div className="music">
                  <div className="music__flex">
                    <div className="music__header">
                      <div className="music__header_item music__playlist">
                        <span className="active">Default</span>
                        <span>Default</span>
                        <span>Default</span>
                      </div>
                      <div
                        className="music__header_item "
                        onClick={() => setModalUpload(true)}
                      >
                        <AddRoundedIcon />
                      </div>
                    </div>
                    <div className="music__body">
                      <div className="music__body_flex">
                        <div className="bodyhead">
                          <input type="checkbox" />
                          <div className="bodyhead__icon">
                            <KeyboardArrowDownRoundedIcon />
                          </div>
                        </div>
                        <div className="bodycontent">
                          <div className="bodycontent__flex">
                            <div className="bodycontent__flex_item">
                              <div className="music__item">
                                <input type="checkbox" />
                                <div className="col__inside">
                                  <span>1. Harris Heller - Guilty Spark </span>
                                  <span className="info__inside">
                                    MP3, 192 kbps, 2.37 MB
                                  </span>
                                </div>
                              </div>
                              <div className="">
                                <span>1:44</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
