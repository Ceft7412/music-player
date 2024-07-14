import { useContext } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Footer from "@/components/footer";
import ModalUpload from "@/components/ModalUpload";
import { RootContext } from "@/context/RootContext";

export default function Landing() {
  const { setModalUpload, modalUpload, storedFiles } = useContext(RootContext);
  console.log("storedFiles:", storedFiles);
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
              <div className="row__flex_row_item row__flex_row_left">
                <div className="row__flex_row_left-flex">
                  <div className="row__flex_row_left-header">
                    
                  </div>
                </div>
              </div>
              <div className="row__flex_row_item row__flex_row_center">
                <div className="row__flex_row_center-flex"></div>
              </div>
              <div className="row__flex_row_item row__flex_row_right">
                <div className="music-what">
                  <div className="music__flex">
                    <div className="music__header">
                      <div className="music__header_item music__playlist">
                        <span className="active">Default</span>
                        <span>Default</span>
                        <span>Default</span>
                      </div>
                      <div
                        className="music__header_item music__upload"
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
                            {storedFiles.map((file, index) => (
                              <div className="bodycontent__flex_item" key={index}>
                                <div className="music__item">
                                  <input type="checkbox" />
                                  <div className="col__inside">
                                    <span>
                                      {index + 1}. {file.artist} - {file.name}
                                    </span>
                                    <span className="info__inside">
                                      {file.type}, {file.kHz} kHz, {file.kbps} kbps,{" "}
                                      {file.size}
                                    </span>
                                  </div>
                                </div>
                                <div className="">
                                  <span>
                                    {file.duration.minutes}:
                                    {file.duration.seconds < 10 ? "0" : ""}
                                    {file.duration.seconds}
                                  </span>
                                </div>
                              </div>
                            ))}
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
