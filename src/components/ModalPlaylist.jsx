import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
export default function ModalPlaylist({ x, y, onClose, playlist }) {
  return (
    <>
      <div
        className="modal"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",

          left: x,
          top: y,
          backgroundColor: "rgb(27, 27, 34)",
          borderRight: "2px solid orange",
          borderBottom: "2px solid orange",

          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          zIndex: 999,
        }}
      >
        <div
          className="modal-playlist"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            padding: "10px",
          }}
        >
          <span>
            <ModeEditOutlineOutlinedIcon style={{ fontSize: "20px" }} />
          </span>
          <span style={{ fontSize: "14px" }}>Edit details</span>
        </div>

        <div
          className="modal-playlist"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            padding: "10px",
          }}
        >
          <span>
            <RemoveCircleOutlineOutlinedIcon style={{ fontSize: "20px" }} />
          </span>
          <span style={{ fontSize: "14px" }}>Delete playlist</span>
        </div>
      </div>
    </>
  );
}
