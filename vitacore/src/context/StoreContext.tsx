import React, { createContext } from "react";
import { useContext } from "react";
import { DataContext } from "./ContextForData";
import { DataStore } from "../shared/store/store";


export const StoreContext = createContext<DataStore | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { grif, puff, sliz, raven } = useContext(DataContext);

  const dataStore = new DataStore({ grif, puff, sliz, raven });

  return (
    <StoreContext.Provider value={dataStore}>{children}</StoreContext.Provider>
  );
};
