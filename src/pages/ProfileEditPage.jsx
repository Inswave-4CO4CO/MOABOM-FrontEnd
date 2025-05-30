import { useEffect, useState } from "react";
import LabelInput from "../components/auth/LabelInput";
import BodyButton from "../components/common/BodyButton";
import { SearchContainer } from "../styles/pages/SearchPage";
import ProfileCard from "../components/common/ProfileCard";
import HeaderButton from "../components/common/HeaderButton";
import {
  Box,
  FileUpload,
  Float,
  Image,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import {
  ButtonContainer,
  LeftGroupContainer,
  PageContainer,
  RigthGroupContainer,
} from "../styles/pages/ProfileEditPage";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../hooks/useUserInfo";

const ProfileEditPage = () => {
  const [nickName, setNickName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  const { myInfo, editMyInfo, isMyInfoLoading } = useUserInfo();

  useEffect(() => {
    if (myInfo) {
      setNickName(myInfo.nickName || "");
      setImageUrl(myInfo.userImage || "");
      setImageFile(null);
    }
  }, [myInfo]);

  // 정보변경..
  const handleEdit = (e) => {
    e.preventDefault();
    editMyInfo({ nickName, imageFile });
  };

  return (
    <SearchContainer>
      <PageContainer style={{ gap: "45px" }}>
        <LeftGroupContainer>
          <ProfileCard
            isEdit={true}
            name={myInfo?.nickName}
            image={myInfo ? myInfo?.userImage : ""}
            isLoading={isMyInfoLoading}
          />
        </LeftGroupContainer>
        <RigthGroupContainer>
          <form onSubmit={handleEdit}>
            <Stack gap="10">
              <Skeleton loading={isMyInfoLoading}>
                <LabelInput label="아이디" value={myInfo?.userId} disabled />
              </Skeleton>
              <Skeleton loading={isMyInfoLoading}>
                <FileUpload.Root maxW="4xl" alignItems="stretch" maxFiles={10}>
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
                          src={imageUrl}
                          alt="프로필 이미지"
                          boxSize="120px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      ) : (
                        <>
                          <Box>파일을 드래그하거나 선택해주세요.</Box>
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
              </Skeleton>
              <Skeleton loading={isMyInfoLoading}>
                <LabelInput
                  label="닉네임"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </Skeleton>
              <Skeleton loading={isMyInfoLoading}>
                <ButtonContainer>
                  <HeaderButton
                    onClick={() => navigate(-1)}
                    style={{ marginRight: "10px" }}
                  >
                    취소
                  </HeaderButton>
                  <BodyButton type="submit">수정</BodyButton>
                </ButtonContainer>
              </Skeleton>
            </Stack>
          </form>
        </RigthGroupContainer>
      </PageContainer>
    </SearchContainer>
  );
};

export default ProfileEditPage;
