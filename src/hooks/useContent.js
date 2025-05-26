import { useQuery } from "@tanstack/react-query";
import { getContentById } from "../services/api/contentDetailService";
import watchType from "../contents/watchType";

export const useContent = (contentId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["content", contentId],
    queryFn: () => getContentById(contentId),
    enabled: !!contentId,
    select: (res) => {
      const content = res.data.content;
      return {
        content,
        type: watchType[res.data.type],
        genre: res.data.genre,
        cast: res.data.cast,
        crew: res.data.crew,
        ott: res.data.ott,
      };
    },
  });

  return {
    content: data?.content,
    type: data?.type,
    genre: data?.genre || [],
    cast: data?.cast || [],
    crew: data?.crew || [],
    ott: data?.ott || [],
    loading: isLoading,
    error,
  };
};
