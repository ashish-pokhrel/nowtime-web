import type { AxiosInstance } from "axios";

export type GroupDto = {
  id: string;
  title: string;
  icon: string;        // e.g. "fa-users"
  orderNo: number;
  description: string;
  color: string;       // hex
  isActive: boolean;
};

export async function fetchGroups(axios: AxiosInstance) {
  const res = await axios.get<GroupDto[]>("/api/Group");
  return res.data;
}
