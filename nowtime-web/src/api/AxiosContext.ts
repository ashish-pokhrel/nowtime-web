import React from "react";
import { axiosInstance } from "./axiosInstance";

export type AxiosContextValue = {
  axios: typeof axiosInstance;
};

export const AxiosContext = React.createContext<AxiosContextValue>({
  axios: axiosInstance,
});
