import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMyWatchingContents,
  getMyWatchedContents,
  getMyWatchCount,
} from "../services/api/myPageService";

export const useMyContents = (activeTab, selectedOtts) => {
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

  return useInfiniteQuery({
    queryKey: ["myContent", activeTab, selectedOtts],
    queryFn: fetchContents,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMyWatchCount = () => {
  return useQuery({
    queryKey: ["myWatchCount"],
    queryFn: async () => {
      const res = await getMyWatchCount();
      return res.data.count;
    },
    staleTime: 1000 * 60 * 5,
  });
};
