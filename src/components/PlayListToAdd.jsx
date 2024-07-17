import { useContext, useState } from "react";
import { RootContext } from "@/context/RootContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { addMusicToPlaylist } from "@/utils/indexdb";
export default function PlayListToAdd() {
  const {
    playlists,
    playListToAddModal,
    setPlayListToAddModal,
    storedFiles,
    indexToAdd,
  } = useContext(RootContext);

  const [playlist, setPlaylist] = useState(null);

  const handleClickPlaylist = (playlistId) => {
    setPlaylist(playlistId);
  };

  const submitToAddPlaylist = async (playlistId) => {
    try {
      await addMusicToPlaylist(playlistId, indexToAdd);
      setPlayListToAddModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {playListToAddModal && (
        <div className="playlist-to-add-modal">
          <div className="playlist-to-add-modal__card">
            <div className="playlist-to-add-modal__card-head">
              <span>Add to playlist</span>
              <div
                className="card-head__playlist-icon"
                onClick={() => setPlayListToAddModal(false)}
              >
                <CloseRoundedIcon />
              </div>
            </div>
            <div className="playlist-to-add-modal__card-body">
              {playlists &&
                playlists.map((playlistItem, index) => (
                  <span
                    className={`card-body__item ${
                      playlistItem.id === playlist ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => handleClickPlaylist(playlistItem.id)}
                  >
                    {playlistItem.name}
                  </span>
                ))}
            </div>
            <div
              className="playlist-to-add-modal__card-footer"
              onClick={() => submitToAddPlaylist(playlist)}
            >
              <span className="card-footer__playlist-save">Save</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
