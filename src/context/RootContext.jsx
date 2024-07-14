import { useState, createContext } from "react";
export const RootContext = createContext();

export function RootProvider({ children }) {
  const [modalUpload, setModalUpload] = useState(false);
  const [storedFiles, setStoredFiles] = useState([]);
  const [itemToPlay, setItemToPlay] = useState(null);
  const [backgroundClickedItem, setBackgroundClickedItem] = useState("");
  return (
    <RootContext.Provider
      value={{
        modalUpload,
        setModalUpload,
        storedFiles,
        itemToPlay,
        setItemToPlay,
        setStoredFiles,
        backgroundClickedItem,
        setBackgroundClickedItem,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}
