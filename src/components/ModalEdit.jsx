import { useContext, useEffect, useState, useRef } from "react";
import { RootContext } from "@/context/RootContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
export default function ModalEdit() {
  const { modalEditPlaylist, setModalEditPlaylist, playlists, playlistIndex } =
    useContext(RootContext);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [showDiffIcon, setShowDiffIcon] = useState(false);
  const fileInput = useRef(null);
  const cardRef = useRef(null); // Create a ref

  useEffect(() => {
    if (playlists && playlistIndex) {
      setCurrentPlaylist(playlists[playlistIndex]);
    }
  }, [playlists, playlistIndex]);

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setModalEditPlaylist(false);
    }
  };

  const handleInputClick = () => {
    fileInput.current.click();
  };

  return (
    <>
      {modalEditPlaylist && (
        <div className="modal-edit-playlist" onClick={handleClickOutside}>
          <div className="modal-edit-playlist__card" ref={cardRef}>
            <div className="modal-edit-playlist__card-head">
              <h1 className="modal-edit-playlist__title">Edit playlist</h1>
              <div
                className="modal-edit-playlist__icon"
                onClick={() => setModalEditPlaylist(false)}
              >
                <CloseRoundedIcon />
              </div>
            </div>
            <div className="modal-edit-playlist__card-body">
              <div
                className="modal-edit-playlist__card-body-item image-edit"
                onMouseEnter={() => setShowDiffIcon(true)}
                onMouseLeave={() => setShowDiffIcon(false)}
              >
                <div style={{ position: "relative" }}>
                  {showDiffIcon && (
                    <div style={{ position: "absolute", right: "-20px", top: "-20px" }}>
                      <MoreHorizOutlinedIcon />
                    </div>
                  )}

                  {showDiffIcon ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={handleInputClick}
                    >
                      <ModeEditOutlineOutlinedIcon
                        style={{ fontSize: "100px", color: "white" }}
                      />
                      <span>Choose a photo</span>
                    </div>
                  ) : (
                    <MusicNoteOutlinedIcon style={{ fontSize: "100px", color: "gray" }} />
                  )}
                  <input
                    type="file"
                    ref={fileInput}
                    style={{ display: "none" }}
                    // onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="modal-edit-playlist__card-body-item cols-edit">
                <div className="cols-edit__name">
                  <label>Name</label>
                  <input type="text" value={currentPlaylist.name} />
                </div>
                <div className="cols-edit__description">
                  <label>Description</label>
                  <textarea type="text" placeholder="Add description" />
                </div>
              </div>
            </div>
            <div className="modal-edit-playlist__card-footer">
              <span className="card-footer__save">Save</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
