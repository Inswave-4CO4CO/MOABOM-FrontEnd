import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWatch,
  deleteWatch,
  modifyWatch,
} from "../services/api/watchService";

export const useCreateWatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contentId, type, genre }) =>
      createWatch(contentId, type, genre),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
    },
  });
};

export const useUpdateWatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contentId, type, genre }) =>
      modifyWatch(contentId, type, genre),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
    },
  });
};

export const useDeleteWatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contentId, type, genre }) =>
      deleteWatch(contentId, type, genre),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
    },
  });
};
