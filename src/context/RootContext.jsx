import { useState, createContext } from "react";
export const RootContext = createContext();

export function RootProvider({ children }) {
  const [modalUpload, setModalUpload] = useState(false);
  const [storedFiles, setStoredFiles] = useState([]);
  return (
    <RootContext.Provider
      value={{ modalUpload, setModalUpload, storedFiles, setStoredFiles }}
    >
      {children}
    </RootContext.Provider>
  );
}
