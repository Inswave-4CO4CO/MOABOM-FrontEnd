import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeMyInfo, getMyInfo } from "../services/api/user";
import { toast } from "react-toastify";

export const useUserInfo = () => {
  const queryClient = useQueryClient();

  const { data: myInfo, isLoading: isMyInfoLoading } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const { mutate: editMyInfo } = useMutation({
    mutationFn: changeMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      toast.success("회원 정보 수정이 완료되었습니다.");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "회원 정보 수정에 실패했습니다."
      );
    },
  });

  return {
    myInfo,
    isMyInfoLoading,
    editMyInfo,
  };
};
