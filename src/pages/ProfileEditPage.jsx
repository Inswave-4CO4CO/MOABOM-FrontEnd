import { useState } from "react";
import LabelInput from "../components/LabelInput";
import BodyButton from "../components/BodyButton";

const ProfileEditPage = () => {
  const [nickName, setNickName] = useState();

  // 기존 정보 가져오기

  // 정보변경..

  // 비밀번호 변경.. 모달

  return (
    <form>
      <LabelInput
        label="닉네임"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
      />
      <BodyButton>변경</BodyButton>
    </form>
  );
};

export default ProfileEditPage;
