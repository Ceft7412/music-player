import { useContext, useEffect, useState, useRef } from "react";
import { RootContext } from "@/context/RootContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { updatePlaylist, fetchPlaylists } from "@/utils/indexdb";

import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
export default function ModalEdit() {
  const {
    modalEditPlaylist,
    setModalEditPlaylist,
    playlists,
    setPlaylists,
    playlistIndex,
    currentPlaylist,
    setCurrentPlaylist,
    photoModal,
    setPhotoModal,
  } = useContext(RootContext);

  const [showDiffIcon, setShowDiffIcon] = useState(false);
  const [image, setImage] = useState(null);
  const fileInput = useRef(null);
  const cardRef = useRef(null);
  const photoModalRef = useRef();
  const moreSetPhotoModal = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (photoModalRef.current && !photoModalRef.current.contains(event.target)) {
        // Clicked outside of the modal, close it
        setPhotoModal(false);
      }
    }

    // Attach the listeners on component mount.
    document.addEventListener("mousedown", handleClickOutside);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [photoModalRef]);

  useEffect(() => {
    if (playlists && playlistIndex !== null && playlistIndex !== undefined) {
      setCurrentPlaylist(playlists[playlistIndex]);
    }
  }, [playlists, playlistIndex]);

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setModalEditPlaylist(false);
      setCurrentPlaylist(playlists[playlistIndex]);
    }
  };

  const handleInputClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCurrentPlaylist({ ...currentPlaylist, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event) => {
    setCurrentPlaylist({ ...currentPlaylist, name: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setCurrentPlaylist({ ...currentPlaylist, description: event.target.value });
  };

  const handleSubmit = async () => {
    if (currentPlaylist) {
      try {
        await updatePlaylist(
          currentPlaylist.id,
          currentPlaylist.name,
          currentPlaylist.description,
          currentPlaylist.image
        );
        const updatedPlaylists = await fetchPlaylists();
        setPlaylists(updatedPlaylists);
        setModalEditPlaylist(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseIconModal = () => {
    setModalEditPlaylist(false);
    setCurrentPlaylist(playlists[playlistIndex]);
  };

  // erase the photo

  const handleRemovePhoto = () => {
    setCurrentPlaylist({ ...currentPlaylist, image: null });
  };

  return (
    <>
      {modalEditPlaylist && (
        <div className="modal-edit-playlist" onClick={handleClickOutside}>
          <div className="modal-edit-playlist__card" ref={cardRef}>
            <div className="modal-edit-playlist__card-head">
              <h1 className="modal-edit-playlist__title">Edit playlist</h1>
              <div className="modal-edit-playlist__icon" onClick={handleCloseIconModal}>
                <CloseRoundedIcon />
              </div>
            </div>
            <div className="modal-edit-playlist__card-body">
              {photoModal && (
                <div className="modal-photo" ref={photoModalRef}>
                  <div className="modal-photo__item" onClick={handleInputClick}>
                    <div className="modal-photo__icon">
                      <ImageRoundedIcon style={{ color: "rgb(201, 201, 201)" }} />
                    </div>
                    <span className="modal-photo__text">Change photo</span>
                  </div>
                  <div className="modal-photo__item" onClick={handleRemovePhoto}>
                    <div className="modal-photo__icon">
                      <DeleteOutlineRoundedIcon style={{ color: "rgb(201, 201, 201)" }} />
                    </div>
                    <span className="modal-photo__text">Remove photo</span>
                  </div>
                </div>
              )}

              <div
                className="modal-edit-playlist__card-body-item image-edit"
                onMouseEnter={() => setShowDiffIcon(true)}
                onMouseLeave={() => setShowDiffIcon(false)}
              >
                <div
                  className="modal-edit-playlist__image-icons-container"
                  style={{ position: "relative" }}
                >
                  <div
                    className="modal-edit-playlist__more-icon-container"
                    style={{ position: "absolute", right: "10px", top: "10px" }}
                    onClick={() => {
                      setPhotoModal(!photoModal);
                    }}
                  >
                    <MoreHorizOutlinedIcon />
                  </div>

                  {currentPlaylist.image ? (
                    <img
                      className="modal-edit-playlist__image"
                      src={currentPlaylist.image}
                      alt={currentPlaylist.name}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <>
                        <MusicNoteOutlinedIcon
                          style={{ fontSize: "100px", color: "gray" }}
                        />
                        <span style={{ color: "gray" }}>Choose a photo</span>
                      </>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="modal-edit-playlist__card-body-item cols-edit">
                <div className="cols-edit__name">
                  <label>Name</label>
                  <input
                    type="text"
                    value={currentPlaylist.name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="cols-edit__description">
                  <label>Description</label>
                  <textarea
                    type="text"
                    placeholder="Add description"
                    value={currentPlaylist.description || ""}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-edit-playlist__card-footer">
              <span className="card-footer__save" onClick={handleSubmit}>
                Save
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
