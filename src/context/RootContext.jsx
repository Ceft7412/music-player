import React from "react";
export const RootContext = React.createContext();

export function RootProvider({ children }) {
  const [modalUpload, setModalUpload] = React.useState(false);

  return (
    <RootContext.Provider value={(modalUpload, setModalUpload)}>
      {children}
    </RootContext.Provider>
  );
}
