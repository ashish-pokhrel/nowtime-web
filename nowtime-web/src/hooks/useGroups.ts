import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";
import { fetchGroups } from "../api/groups.api";

export function useGroups() {
  const axios = useAxios();

  return useQuery({
    queryKey: ["groups"],
    queryFn: () => fetchGroups(axios),
    select: (data) =>
      data
        .filter((x) => x.isActive)
        .sort((a, b) => a.orderNo - b.orderNo),
  });
}
