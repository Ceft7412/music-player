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
          <div className="music__row-item">
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
          </div>
          {/*  */}
          {/* row */}
          <div className="music__row-item footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
