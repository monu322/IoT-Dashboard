import { createContext } from "react";

export const data = [];

export const DataContext = createContext({
  data: data,
  dataLoading:false,
  setData: () => {
  },
  setdataLoading: () => {
  }
});
