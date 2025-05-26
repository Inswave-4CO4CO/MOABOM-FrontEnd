import { useQuery } from "@tanstack/react-query";
import { deleteWatch } from "../services/api/watchService";

export const useMyWatch = (contentId) => {
  return useQuery({
    queryKey: ["watch"],
    queryFn: (contentId) => deleteWatch(contentId),
  });
};
