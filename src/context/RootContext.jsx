import { useState, createContext, useEffect } from "react";
export const RootContext = createContext();

export function RootProvider({ children }) {
  const [modalUpload, setModalUpload] = useState(false);
  const [modalPlaylist, setModalPlaylist] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [modalEditPlaylist, setModalEditPlaylist] = useState(false);

  const [storedFiles, setStoredFiles] = useState([]);
  const [itemToPlay, setItemToPlay] = useState(null);
  const [backgroundClickedItem, setBackgroundClickedItem] = useState("");

  const [playlists, setPlaylists] = useState(null);
  const [playlistIndex, setPlaylistIndex] = useState(null);

  const [volume, setVolume] = useState(() => {
    const volumeRange = localStorage.getItem("volume");
    return Number(volumeRange) || 0;
  });

  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("volume", volume);
    }
  }, [volume]);

  return (
    <RootContext.Provider
      value={{
        photoModal,
        setPhotoModal,
        modalUpload,
        setModalUpload,
        setCurrentPlaylist,
        modalEditPlaylist,
        currentPlaylist,
        setModalEditPlaylist,
        modalPlaylist,
        setModalPlaylist,
        storedFiles,
        itemToPlay,
        setItemToPlay,
        setStoredFiles,
        setPlaylists,
        playlists,
        playlistIndex,
        setPlaylistIndex,
        volume,
        setVolume,
        backgroundClickedItem,
        setBackgroundClickedItem,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}
