import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContentDetailPage from "./pages/ContentDetailPage";
import GlobalStyle from "./styles/GlobalStyle";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import SignupPage from "./pages/SignupPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import SearchPage from "./pages/SearchPage";
import MainPage from "./pages/MainPage";

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
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/content/:contentId" element={<ContentDetailPage />} />
            <Route
              path="/oauth2/redirect"
              element={<OAuth2RedirectHandler />}
            />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Router>
        <Footer />
        <ToastContainer autoClose={3000} pauseOnHover={false} closeOnClick />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
