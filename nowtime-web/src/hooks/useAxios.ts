import { useContext } from "react";
import { AxiosContext } from "../api/AxiosContext";

export function useAxios() {
  return useContext(AxiosContext).axios;
}
