import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWatch,
  deleteWatch,
  modifyWatch,
} from "../services/api/watchService";
import useAuthStore from "../store/useAuthStore";

export const useWatch = (contentId) => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();

  const { mutate: createWatchMutate } = useMutation({
    mutationFn: ({ contentId, type, genre }) =>
      createWatch(contentId, type, genre),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content", contentId] });
      queryClient.invalidateQueries({
        queryKey: ["myContent", "watching", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["myContent", "watched", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["myWatchCount", userId],
      });
    },
  });

  const { mutate: updateWatchMutate } = useMutation({
    mutationFn: ({ contentId, type, genre }) =>
      modifyWatch(contentId, type, genre),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content", contentId] });
      queryClient.invalidateQueries({
        queryKey: ["myContent", "watching", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["myContent", "watched", userId],
      });
    },
  });

  const { mutate: deleteWatchMutate } = useMutation({
    mutationFn: (contentId, type, genre) => deleteWatch(contentId, type, genre),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content", contentId] });
      queryClient.invalidateQueries({
        queryKey: ["myContent", "watching", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["myContent", "watched", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["myWatchCount", userId],
      });
    },
  });

  return {
    createWatchMutate,
    updateWatchMutate,
    deleteWatchMutate,
  };
};
