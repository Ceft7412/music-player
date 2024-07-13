import React from "react";
import { Footer } from "@/components/footer";
export default function Home() {
  return (
    <>
      <div className="music">
        {/*  */}
        {/* column */}
        <div className="music__layout">
          {/*  */}
          {/* row */}
          <div className="row">
            <div className="row__flex_row">
              <div className=""></div>
              <div className=""></div>
              <div className=""></div>
            </div>
          </div>
          {/*  */}
          {/* row */}
          <div className="row footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
