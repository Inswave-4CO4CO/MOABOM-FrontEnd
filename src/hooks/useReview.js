import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createReview,
  deleteReview,
  findByContentIdAndUserId,
  modifyReview,
  getReviewByPage,
} from "../services/api/reviewService";
import { toast } from "react-toastify";

export const useReview = (contentId) => {
  const queryClient = useQueryClient();

  const { data: userReview } = useQuery({
    queryKey: ["myReview", contentId],
    queryFn: () => findByContentIdAndUserId(contentId).then((res) => res.data),
    enabled: !!contentId,
  });

  const { mutate: createReviewMutate } = useMutation({
    mutationFn: ({ reviewText, rating }) =>
      createReview(reviewText, rating, contentId),
    onSuccess: () => {
      toast.success("리뷰가 등록되었습니다!");

      queryClient.invalidateQueries({ queryKey: ["myReview", contentId] });
      queryClient.invalidateQueries(["reviewList"]);
      queryClient.invalidateQueries(["myReviewList"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "리뷰 등록에 실패했습니다."
      );
    },
  });

  const { mutate: modifyReviewMutate } = useMutation({
    mutationFn: ({ reviewId, reviewText, rating }) =>
      modifyReview(reviewId, reviewText, rating),
    onSuccess: () => {
      toast.success("리뷰가 수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["myReview", contentId] });
      queryClient.invalidateQueries(["reviewList"]);
      queryClient.invalidateQueries(["myReviewList"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "리뷰 수정에 실패했습니다."
      );
    },
  });

  const { mutate: deleteReviewMutate } = useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => {
      toast.success("리뷰가 삭제되었습니다!");
      queryClient.removeQueries({ queryKey: ["myReview", contentId] });
      queryClient.invalidateQueries(["reviewList"]);
      queryClient.invalidateQueries(["myReviewList"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "리뷰 삭제에 실패했습니다."
      );
    },
  });

  const {
    data: reviewData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error: reviewError,
  } = useInfiniteQuery({
    queryKey: ["reviewList", contentId],
    queryFn: ({ pageParam = 1 }) => getReviewByPage(contentId, pageParam),
    getNextPageParam: (lastPage) => {
      const data = lastPage.data;
      return data.currentPage < data.totalPages
        ? data.currentPage + 1
        : undefined;
    },
  });

  return {
    reviewData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    reviewError,
    userReview,
    createReviewMutate,
    modifyReviewMutate,
    deleteReviewMutate,
  };
};
