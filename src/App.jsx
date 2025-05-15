import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import GlobalStyle from "./styles/GlobalStyle";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import BodyButton from "./components/BodyButton";

const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <GlobalStyle />
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
      <BodyButton width="150px">프로필 관리</BodyButton>
      <BodyButton width="200px">OTT 추천받기</BodyButton>
    </ChakraProvider>
  );
};

export default App;
