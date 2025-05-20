import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContentDetailPage from "./pages/ContentDetailPage";
import GlobalStyle from "./styles/GlobalStyle";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import HeaderButton from "./components/HeaderButton";
import SignupPage from "./pages/SignupPage";
import BodyButton from "./components/BodyButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import MyPage from "./pages/MyPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route
              path="/oauth2/redirect"
              element={<OAuth2RedirectHandler />}
            />
          </Routes>
        </Router>
        {/* <BodyButton width="150px">프로필 관리</BodyButton>
        <BodyButton width="200px">OTT 추천받기</BodyButton> */}
        <Footer />
        <ToastContainer />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
