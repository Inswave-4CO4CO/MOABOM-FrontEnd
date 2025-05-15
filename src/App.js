import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import GlobalStyle from "./styles/GlobalStyle";
import { Button, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import HeaderButton from "./components/HeaderButton";

const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <GlobalStyle />
        <Header />
        <HeaderButton>안녕</HeaderButton>
        <Navbar />
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
