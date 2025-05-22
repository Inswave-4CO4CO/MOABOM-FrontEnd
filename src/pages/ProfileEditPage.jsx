import { useEffect, useState } from "react";
import LabelInput from "../components/LabelInput";
import BodyButton from "../components/BodyButton";
import { SearchContainer } from "../styles/pages/SearchPage";
import Profile from "../components/Profile";
import HeaderButton from "../components/HeaderButton";
import { Box, FileUpload, Float, Image, Stack } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import {
  ButtonContainer,
  LeftGroupContainer,
  PageContainer,
  RigthGroupContainer,
} from "../styles/pages/ProfileEditPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeMyInfo, getMyInfo } from "../services/api/user";
import { toast } from "react-toastify";

const ProfileEditPage = () => {
  const [nickName, setNickName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const queryClient = useQueryClient();

  const { VITE_API_URL } = import.meta.env;
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  // 기존 정보 가져오기
  const { data: myInfo, isLoading } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  useEffect(() => {
    if (myInfo) {
      setNickName(myInfo.nickName || "");
      setImageUrl(myInfo.userImage || "");
      setImageFile(null);
    }
  }, [myInfo]);

  const { mutate: editMyInfo, isPending } = useMutation({
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

  // 정보변경..
  const handleEdit = (e) => {
    e.preventDefault();
    editMyInfo({ nickName, imageFile });
  };

  // 비밀번호 변경.. 모달

  return (
    <SearchContainer>
      <PageContainer>
        <LeftGroupContainer>
          <Profile
            isEdit={true}
            name={myInfo?.nickName}
            image={myInfo ? VITE_API_URL + myInfo?.userImage : ""}
          />
        </LeftGroupContainer>
        <RigthGroupContainer>
          <form onSubmit={handleEdit}>
            <Stack gap="10">
              <LabelInput
                label="아이디"
                value={myInfo?.userId}
                disabled
                style={{ width: "80%" }}
              />
              <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10}>
                <FileUpload.HiddenInput
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <FileUpload.Dropzone>
                  <FileUpload.DropzoneContent>
                    {imageFile ? (
                      <Image
                        src={URL.createObjectURL(imageFile)}
                        alt="미리보기"
                        boxSize="120px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    ) : imageUrl ? (
                      <Image
                        src={VITE_API_URL + imageUrl}
                        alt="프로필 이미지"
                        boxSize="120px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    ) : (
                      <>
                        <Box>Drag and drop files here</Box>
                        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                      </>
                    )}
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                {imageFile && (
                  <FileUpload.ItemGroup>
                    <FileUpload.Item file={imageFile}>
                      {imageFile.name}
                      <Float placement="top-end">
                        <FileUpload.ItemDeleteTrigger
                          boxSize="4"
                          layerStyle="fill.solid"
                          onClick={handleRemoveImage}
                        >
                          <LuX />
                        </FileUpload.ItemDeleteTrigger>
                      </Float>
                    </FileUpload.Item>
                  </FileUpload.ItemGroup>
                )}
              </FileUpload.Root>
              <LabelInput
                label="닉네임"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                style={{ width: "80%" }}
              />
              <ButtonContainer>
                <HeaderButton>취소</HeaderButton>
                <BodyButton type="submit">수정</BodyButton>
              </ButtonContainer>
            </Stack>
          </form>
        </RigthGroupContainer>
      </PageContainer>
    </SearchContainer>
  );
};

export default ProfileEditPage;
