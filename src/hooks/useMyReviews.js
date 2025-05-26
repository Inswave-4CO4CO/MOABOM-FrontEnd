import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMyReviewList } from "../services/api/myPageService";
import useAuthStore from "../store/useAuthStore";

export const useMyReviews = (enabled) => {
  const { userId } = useAuthStore();

  const { data: reviewCount } = useQuery({
    queryKey: ["myReviewCount", userId],
    queryFn: async () => {
      const res = await getMyReviewList(1);
      return res.data.totalCount;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });

  const fetchReviews = async ({ pageParam = 1 }) => {
    const res = await getMyReviewList(pageParam);
    const { content, currentPage, totalPages, totalCount } = res.data;

    return {
      content,
      currentPage,
      totalPages,
      totalCount,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
    };
  };

  const {
    data: reviewData,
    fetchNextPage: fetchNextReviewPage,
    hasNextPage: hasMoreReviews,
    isFetchingNextPage: isLoadingNextReview,
    isLoading: isReviewLoading,
    refetch: refetchReviewList,
  } = useInfiniteQuery({
    queryKey: ["myReviewList", userId],
    queryFn: fetchReviews,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  return {
    reviewCount,
    reviewData,
    fetchNextReviewPage,
    hasMoreReviews,
    isLoadingNextReview,
    isReviewLoading,
    refetchReviewList,
  };
};
