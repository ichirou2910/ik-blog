import { useLocation } from "react-router";

export const useQuery = () => {
  return useLocation().search;
};
