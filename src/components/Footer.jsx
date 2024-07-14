import { useContext } from "react";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import LinearProgress from "@mui/material/LinearProgress";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

import { RootContext } from "@/context/RootContext";
export default function Footer() {
  const {
    setModalUpload,
    modalUpload,
    storedFiles,
    backgroundClickedItem,
    setBackgroundClickedItem,
    s,
  } = useContext(RootContext);

  return (
    <>
      <div className="footer">
        <div className="footer__flex">
          <div className="footer__flex-cols">
            <div className="">
              <SkipPreviousIcon style={{ fontSize: 50 }} />
              <PlayCircleFilledWhiteOutlinedIcon style={{ fontSize: 50 }} />
              <SkipNextIcon style={{ fontSize: 50 }} />
            </div>
            <div className="footer__progress">
              <Slider
                color="inherit"
                aria-label="time-indicator"
                value={20}
                onChange={{}}
                sx={{
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",

                    "&.Mui-active": {
                      width: 8,
                      height: 8,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
            </div>
            <div className="footer__volume">
              <VolumeDown />
              <Slider
                color="inherit"
                sx={{ height: "15%" }}
                aria-label="Volume"
                value={20}
                onChange={{}}
              />
              <VolumeUp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
