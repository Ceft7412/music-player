import { useState, useContext } from "react";
import { RootContext } from "@/context/RootContext";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { fetchActiveItem, deleteMusic, fetchStoredFiles } from "@/utils/indexdb";
export default function MusicModal({ x, y, index }) {
  const {
    modalMusic,
    storedFiles,
    setStoredFiles,
    setItemToPlay,
    isPlaying,
    setMusicModal,
    setIsPlaying,
    playlists,
    setPlayListToAddModal,
    setIndexToAdd,
  } = useContext(RootContext);

  console.log(storedFiles[index].id);

  const [playMusic, setPlayMusic] = useState();

  const handleClickPlay = () => {
    try {
      setItemToPlay(storedFiles[index]);
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickDelete = async () => {
    try {
      await deleteMusic(storedFiles[index].id);
      const updatedMusic = await fetchStoredFiles();
      setStoredFiles(updatedMusic);
      setMusicModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayListClick = () => {
    setPlayListToAddModal(true);
    setIndexToAdd(storedFiles[index].id);
  };
  return (
    <>
      <div
        className="modal-music"
        style={{
          left: x,
          top: y,
        }}
      >
        <div className="modal-music__item" onClick={handleClickPlay}>
          <span>
            <PlayCircleOutlineRoundedIcon />
          </span>
          <span>Play</span>
        </div>
        <div className="modal-music__item border-bottom" onClick={handleClickDelete}>
          <span>
            <RemoveCircleOutlineRoundedIcon />
          </span>
          <span>Remove</span>
        </div>
        <div className="modal-music__item" onClick={handlePlayListClick}>
          <span>
            <PlaylistAddRoundedIcon />
          </span>
          <span>Add to playlist</span>
        </div>
      </div>
    </>
  );
}
