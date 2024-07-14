import { useContext } from "react";

import Footer from "@/components/Footer";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import ModalUpload from "@/components/ModalUpload";
import { RootContext } from "@/context/RootContext";
import Music from "@/components/Music";

export default function Landing() {
  const {
    itemToPlay,
    setItemToPlay,
    setModalUpload,
    modalUpload,
    backgroundClickedItem,
    setBackgroundClickedItem,
  } = useContext(RootContext);

  const handleClose = () => {
    if (modalUpload) {
      setModalUpload(false);
    }
    if (backgroundClickedItem) {
      setBackgroundClickedItem("");
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
                {/*  */}
                <div className="row__flex_row_left-flex">
                  <div className="row__flex_row_left-header">
                    <AlbumRoundedIcon style={{ fontSize: 150 }} />
                  </div>
                  <div className="row__flex_row_left-body">
                    <span className="title-left">
                      {itemToPlay ? itemToPlay.name : ""}
                    </span>
                    <span className="artist-left">
                      {itemToPlay ? itemToPlay.artist : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row__flex_row_item row__flex_row_center">
                <div className="row__flex_row_center-flex"></div>
              </div>
              <Music />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
