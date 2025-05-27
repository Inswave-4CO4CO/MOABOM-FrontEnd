import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100px;
  max-width: 100px;
  gap: 10px;
  text-align: center;
  justify-content: center;
  cursor: pointer;

  .profileGroup {
    display: flex;
    flex-direction: column;
  }
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

export const ProfileName = styled.span`
  font-weight: bold;
`;
