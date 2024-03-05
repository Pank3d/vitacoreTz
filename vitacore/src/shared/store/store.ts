import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

interface InitialValues {
  grif: string[];
  puff: string[];
  sliz: string[];
  raven: string[];
}

export const DataStoreContext = createContext<DataStore | null>(null);

export class DataStore {
  grif: string[];
  puff: string[];
  sliz: string[];
  raven: string[];

  constructor(initialValues: InitialValues) {
    const { grif, puff, sliz, raven } = initialValues;
    this.grif = grif;
    this.puff = puff;
    this.sliz = sliz;
    this.raven = raven;
    makeAutoObservable(this);
  }
}

export function useDataStore() {
  const store = useContext(DataStoreContext);
  if (!store) {
    throw new Error("DataStoreContext is not provided");
  }
  return store;
}
