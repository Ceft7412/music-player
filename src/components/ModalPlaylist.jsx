import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { RootContext } from "@/context/RootContext";
import { useContext } from "react";

import { deletePlaylist, fetchPlaylists } from "@/utils/indexdb";
export default function ModalPlaylist({ x, y, onClose, playlist }) {
  const {
    setModalEditPlaylist,
    setModalPlaylist,
    playlists,
    setPlaylists,
    playlistIndex,
    currentPlaylist,
  } = useContext(RootContext);

  const handleDelete = async () => {
    try {
      await deletePlaylist(currentPlaylist.id);
      const updatedPlaylists = await fetchPlaylists();
      setPlaylists(updatedPlaylists);
      setModalPlaylist(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div
        className="modal-playlist"
        style={{
          left: x,
          top: y,
        }}
      >
        <div className="modal-playlist__item" onClick={() => setModalEditPlaylist(true)}>
          <span>
            <ModeEditOutlineOutlinedIcon style={{ fontSize: "20px" }} />
          </span>
          <span className="modal-playlist__item-t">Edit details</span>
        </div>

        <div className="modal-playlist__item" onClick={handleDelete}>
          <span>
            <RemoveCircleOutlineOutlinedIcon style={{ fontSize: "20px" }} />
          </span>
          <span className="modal-playlist__item-t">Delete playlist</span>
        </div>
      </div>
    </>
  );
}
