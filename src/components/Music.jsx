import { RootContext } from "@/context/RootContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {
  setActiveItem,
  fetchActiveItem,
  fetchStoredFiles,
  createPlaylists,
  fetchPlaylists,
} from "@/utils/indexdb";

import ModalPlaylist from "@/components/ModalPlaylist";
import { useContext, useState, useEffect } from "react";
export default function Music() {
  const {
    setModalUpload,
    modalUpload,
    storedFiles,
    setStoredFiles,
    backgroundClickedItem,
    setBackgroundClickedItem,
    playlists,
    setPlaylists,
    itemToPlay,
    setItemToPlay,
    modalPlaylist,
    setModalPlaylist,
  } = useContext(RootContext);

  const [playlistPosition, setPlaylistsPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);

  console.log(showModal);
  const [clickedPlaylistIndex, setClickedPlaylistIndex] = useState(null);
  useEffect(() => {
    async function loadStoredFiles() {
      try {
        const files = await fetchStoredFiles();
        const active = await fetchActiveItem();
        const playlistS = await fetchPlaylists();

        setPlaylists(playlistS);
        setStoredFiles(files);
        setItemToPlay(active);
      } catch (error) {
        console.error("Error fetching stored files:", error);
      }
    }

    loadStoredFiles();
  }, []);

  const handleActiveBackground = async (item) => {
    try {
      await setActiveItem(item);
      const active = await fetchActiveItem();
      setItemToPlay(active);
    } catch (e) {
      console.error("Error setting active item:", error);
    }
  };
  const handleClose = () => {
    if (modalUpload) {
      setModalUpload(false);
    }
  };

  const handleAddPlaylist = async () => {
    try {
      await createPlaylists("My Playlist");
      const updatedPlaylists = await fetchPlaylists();
      setPlaylists(updatedPlaylists);
    } catch (error) {
      console.error("Error creating new playlist:", error);
    }
  };

  const handleRightClick = (index, event) => {
    event.preventDefault();
    setPlaylistsPosition({ x: event.clientX, y: event.clientY });
    setClickedPlaylistIndex(index);
    setModalPlaylist(true);
  };

  return (
    <div className="row__flex_row_item row__flex_row_right">
      <div className="music-what">
        <div className="music__flex">
          <div className="music__header">
            <div className="music__header_item music__playlist">
              {playlists &&
                playlists.map((playlist, index) => (
                  <span
                    className="music__header__playlist-name"
                    key={index}
                    onContextMenu={(event) => handleRightClick(index, event)}
                  >
                    {playlist.name}
                  </span>
                ))}
            </div>
            <div className="music__header_item  music__right-items">
              <div
                className="music__playlist-add"
                onClick={handleAddPlaylist}
                title="Add Playlist"
              >
                <AddRoundedIcon />
              </div>
              <div
                className="music__upload"
                onClick={() => setModalUpload(true)}
                title="Upload file"
              >
                <FileUploadOutlinedIcon />
              </div>
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
                    <div
                      className="bodycontent__flex_item"
                      key={index}
                      style={{
                        backgroundColor: backgroundClickedItem,
                      }}
                      onClick={() => setBackgroundClickedItem("rgba(42, 38, 38, 0.995)")}
                      onDoubleClick={() => handleActiveBackground(file)}
                      onContextMenu={(e) => {
                        e.preventDefault(); // Prevent the context menu from appearing
                        // Handle right click here
                        console.log(`Right clicked on item ${index}`);
                      }}
                    >
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

      {modalPlaylist && (
        <ModalPlaylist
          x={playlistPosition.x}
          y={playlistPosition.y}
          playlist={playlists[clickedPlaylistIndex]} // Pass relevant playlist data
        />
      )}
    </div>
  );
}
