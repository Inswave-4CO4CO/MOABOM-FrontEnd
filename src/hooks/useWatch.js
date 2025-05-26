import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWatch,
  deleteWatch,
  modifyWatch,
} from "../services/api/watchService";

export const useCreateWatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contentId, type }) => createWatch(contentId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
    },
  });
};

export const useUpdateWatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contentId, type }) => modifyWatch(contentId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
    },
  });
};

export const useDeleteWatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId) => deleteWatch(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
    },
  });
};
