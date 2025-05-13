import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import GlobalStyle from "./styles/GlobalStyle";
import { Footer } from "./components/Footer";
import { ProfileIcon } from "./components/ProfileIcon";
import { Text } from "./components/Text";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Navbar />
      <ProfileIcon
        imagePath={"image/kimheewon.png"}
        name={"김희원"}
        role={"주연"}
        cast={"약선"}
      />

      <Text text={"넷플릭스"} count={5} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
