import { useQuery } from "@tanstack/react-query";
import { getMyGenreContents } from "../services/api/myPageService";

export const useMyGenreStats = () => {
  return useQuery({
    queryKey: ["myGenreStats"],
    queryFn: () => getMyGenreContents(),
  });
};
