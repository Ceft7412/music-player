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
import MusicModal from "@/components/MusicModal";
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
    playlistIndex,
    setPlaylistIndex,
    modalPlaylist,
    setModalPlaylist,
    setEditModalPlaylist,
    setMusicModal,
    musicModal,
    setIsPlaying,
  } = useContext(RootContext);

  const [playlistPosition, setPlaylistsPosition] = useState({ x: 0, y: 0 });
  const [musicPosition, setMusicPosition] = useState({ x: 0, y: 0 });
  const [clickedIndexItem, setClickedIndexItem] = useState(null);

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

      setIsPlaying(true);
      setItemToPlay(active);
    } catch (e) {
      console.error("Error setting active item:", e);
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
    if (musicModal) {
      setMusicModal(false);
    }
    setPlaylistsPosition({ x: event.clientX, y: event.clientY });
    setPlaylistIndex(index);
    setModalPlaylist(true);
  };

  const handleRightClickItem = (index, event) => {
    event.preventDefault();
    if (modalPlaylist) {
      setModalPlaylist(false);
    }
    setClickedIndexItem(index);
    setMusicPosition({ x: event.clientX, y: event.clientY });

    setMusicModal(true);
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
              <div className="bodyhead"></div>
              <div className="bodycontent">
                <div className="bodycontent__flex">
                  {storedFiles.map((file, index) => (
                    <div
                      className="bodycontent__flex_item"
                      key={index}
                      onClick={() => setBackgroundClickedItem("rgba(42, 38, 38, 0.995)")}
                      onDoubleClick={() => handleActiveBackground(file)}
                      onContextMenu={(event) => handleRightClickItem(index, event)}
                    >
                      <div className="music__item">
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
      {musicModal && (
        <MusicModal x={musicPosition.x} y={musicPosition.y} index={clickedIndexItem} />
      )}
      {modalPlaylist && (
        <ModalPlaylist
          x={playlistPosition.x}
          y={playlistPosition.y}
          // Pass relevant playlist data
        />
      )}
    </div>
  );
}
