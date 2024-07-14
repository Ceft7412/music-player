import React from "react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer__flex">
          <div className="footer__flex-cols">
            <div className="">
              <SkipPreviousRoundedIcon style={{ fontSize: 40 }} />
              <PlayCircleFilledRoundedIcon style={{ fontSize: 40 }} />
              <SkipNextRoundedIcon style={{ fontSize: 40 }} />
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
}
