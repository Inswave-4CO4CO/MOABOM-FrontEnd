import { useQuery } from "@tanstack/react-query";
import { getMyGenreContents } from "../services/api/myPageService";
import useAuthStore from "../store/useAuthStore";

export const useMyGenreStats = () => {
  const { userId } = useAuthStore();
  return useQuery({
    queryKey: ["myGenreStats", userId],
    queryFn: () => getMyGenreContents(),
    enabled: !!userId,
  });
};
