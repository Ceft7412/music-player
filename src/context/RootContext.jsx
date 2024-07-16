import { useState, createContext, useEffect } from "react";
export const RootContext = createContext();

export function RootProvider({ children }) {
  const [modalUpload, setModalUpload] = useState(false);
  const [modalPlaylist, setModalPlaylist] = useState(false);
  const [storedFiles, setStoredFiles] = useState([]);
  const [itemToPlay, setItemToPlay] = useState(null);
  const [backgroundClickedItem, setBackgroundClickedItem] = useState("");

  const [playlists, setPlaylists] = useState(null);

  console.log(playlists);

  const [volume, setVolume] = useState(() => {
    const volumeRange = localStorage.getItem("volume");
    return Number(volumeRange) || 0;
  });

  useEffect(() => {
    localStorage.setItem("volume", volume);
  }, [volume]);

  return (
    <RootContext.Provider
      value={{
        modalUpload,
        setModalUpload,
        modalPlaylist,
        setModalPlaylist,
        storedFiles,
        itemToPlay,
        setItemToPlay,
        setStoredFiles,
        setPlaylists,
        playlists,
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
