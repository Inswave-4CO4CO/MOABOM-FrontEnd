import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return (
    <FooterContainer>
      <p>
        @2025 모아봄(MOABOM). All rights reserved.
        <br />
        서비스 소개 | 이용약관 | 개인정보처리방침 | 팀소개
        <br />
        문의: contact@moabom.com
      </p>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  padding: 10px 0 10px 30px;
  background-color: #f0f0f0;
  box-sizing: border-box;
`;
