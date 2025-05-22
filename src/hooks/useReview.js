import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  deleteReview,
  findByContentIdAndUserId,
  modifyReview,
} from "../services/api/reviewService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const useReview = () => {
  const queryClient = useQueryClient();
  const { contentId } = useParams();

  const { data: userReview } = useQuery({
    queryKey: ["myReview", contentId],
    queryFn: () => findByContentIdAndUserId(contentId).then((res) => res.data),
    enabled: !!contentId, // contentId가 있을 때만 동작
  });

  const { mutate: createReviewMutate } = useMutation({
    mutationFn: ({ reviewText, rating }) =>
      createReview(reviewText, rating, contentId),
    onSuccess: () => {
      toast.success("리뷰가 등록되었습니다!");
      // 리뷰 목록 쿼리 무효화 (다시 불러오기)
      queryClient.invalidateQueries({ queryKey: ["review", contentId] });
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
      queryClient.invalidateQueries({ queryKey: ["review", contentId] });
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
      queryClient.invalidateQueries({ queryKey: ["review", contentId] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "리뷰 삭제에 실패했습니다."
      );
    },
  });

  return {
    userReview,
    createReviewMutate,
    modifyReviewMutate,
    deleteReviewMutate,
  };
};
