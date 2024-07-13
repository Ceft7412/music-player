import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <div className="music">
        {/*  */}
        {/* column */}
        <div className="music__layout">
          {/*  */}
          {/* row */}
          <div className="row content">
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
                      <div className="music__header_item ">
                        <AddRoundedIcon />
                      </div>
                    </div>
                    <div className="music__body"></div>
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
