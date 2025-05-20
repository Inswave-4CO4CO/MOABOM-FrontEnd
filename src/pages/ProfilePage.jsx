import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { checkAuth } from "../services/api/auth";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: checkAuth,
    onSuccess: (data) => {
      setUserInfo(data);
    },
  });

  const handleFetchUser = () => {
    mutate();
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome to your profile!</p>
      <button onClick={handleFetchUser}>가져오기</button>
      {isPending && <p>로딩 중...</p>}
      {isError && <p style={{ color: "red" }}>{error.message}</p>}
      {userInfo && (
        <div style={{ marginTop: "2rem" }}>
          <h2>유저 정보</h2>
          <div>
            <strong>프로필 이미지:</strong>{" "}
            {userInfo.userImage ? (
              <img
                src={userInfo.userImage}
                alt="프로필"
                style={{ width: 80, height: 80, borderRadius: "50%" }}
              />
            ) : (
              <span>이미지 없음</span>
            )}
          </div>
          <div>
            <strong>닉네임:</strong> {userInfo.nickName}
          </div>
          <div>
            <strong>아이디:</strong> {userInfo.userId}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
