import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMyWatchingContents,
  getMyWatchedContents,
  getMyWatchCount,
} from "../services/api/myPageService";
import useAuthStore from "../store/useAuthStore";

export const useMyContents = (activeTab, selectedOtts) => {
  const { userId } = useAuthStore();

  const { data: watchCount } = useQuery({
    queryKey: ["myWatchCount", userId],
    queryFn: async () => {
      const res = await getMyWatchCount();
      return res.data.count;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });

  const fetchContents = async ({ pageParam = 1 }) => {
    const res =
      activeTab === "watching"
        ? await getMyWatchingContents(pageParam, selectedOtts)
        : await getMyWatchedContents(pageParam, selectedOtts);

    const { content, currentPage, totalPages } = res.data;

    return {
      content,
      currentPage,
      totalPages,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
    };
  };

  const {
    data: contentData,
    fetchNextPage: fetchNextContentPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isContentLoading,
  } = useInfiniteQuery({
    queryKey: ["myContent", activeTab, userId],
    queryFn: fetchContents,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });

  return {
    watchCount,
    contentData,
    fetchNextContentPage,
    hasNextPage,
    isFetchingNextPage,
    isContentLoading,
  };
};
