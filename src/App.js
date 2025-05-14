import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import GlobalStyle from "./styles/GlobalStyle";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Review } from "./components/Review";
import styled from "styled-components";

const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <GlobalStyle />
        <Header />
        <Navbar />
        <ReviewContainer>
          <Review
            imagePath={"image/kimheewon.png"}
            nickname={"도라지"}
            date={"2022-05-11"}
            rating={3.5}
            text={
              "ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㅓㅓㅓㅓㅓㅓㅓㅓ"
            }
            title={"조명가게"}
          />
          <Review
            imagePath={"image/kimheewon.png"}
            nickname={"도라지"}
            date={"2022-05-11"}
            rating={3.5}
            text={"ㅇ"}
            isUser={true}
          />
          <Review />
          <Review />
        </ReviewContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;

const ReviewContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: pink;
`;
