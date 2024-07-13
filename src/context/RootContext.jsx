import { useState, createContext } from "react";
export const RootContext = createContext();

export function RootProvider({ children }) {
  const [modalUpload, setModalUpload] = useState(false);

  return (
    <RootContext.Provider value={{ modalUpload, setModalUpload }}>
      {children}
    </RootContext.Provider>
  );
}
