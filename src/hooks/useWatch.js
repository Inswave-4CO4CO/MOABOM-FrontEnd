import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWatch,
  deleteWatch,
  modifyWatch,
} from "../services/api/watchService";
import useAuthStore from "../store/useAuthStore";

export const useCreateWatch = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();

  return useMutation({
    mutationFn: ({ contentId, type }) => createWatch(contentId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
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
};

export const useUpdateWatch = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();
  return useMutation({
    mutationFn: ({ contentId, type }) => modifyWatch(contentId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
      queryClient.invalidateQueries({
        queryKey: ["myContent", "watching", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["myContent", "watched", userId],
      });
    },
  });
};

export const useDeleteWatch = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();
  return useMutation({
    mutationFn: (contentId) => deleteWatch(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
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
};
