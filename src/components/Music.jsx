import { RootContext } from "@/context/RootContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { useContext } from "react";
export default function Music() {
  const { setModalUpload, modalUpload, storedFiles } = useContext(RootContext);
  console.log("storedFiles:", storedFiles);
  const handleClose = () => {
    if (modalUpload) {
      setModalUpload(false);
    }
  };
  return (
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
                            {file.type}, {file.kHz} kHz, {file.kbps} kbps, {file.size}
                          </span>
                        </div>
                      </div>
                      <div className="">
                        <span>
                          {file.duration.minutes}:{file.duration.seconds < 10 ? "0" : ""}
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
  );
}
