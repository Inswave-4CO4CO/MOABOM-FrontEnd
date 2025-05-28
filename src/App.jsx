import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ContentDetailPage from "./pages/ContentDetailPage";
import GlobalStyle from "./styles/GlobalStyle";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import SignupPage from "./pages/SignupPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import SearchPage from "./pages/SearchPage";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import WishlistPage from "./pages/WishlistPage";
import RecommendPage from "./pages/RecommendPage";
import PersonDetailPage from "./pages/PersonDetailPage";
import { useEffect } from "react";

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

function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/signup"].includes(location.pathname);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("toast") === "expired") {
      toast.warn(
        "로그인 정보가 만료되어 로그아웃 되었습니다. 다시 로그인 해주세요",
        {
          toastId: "logout-expired",
        }
      );
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  return (
    <>
      <GlobalStyle />
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && (
        <>
          <div style={{ height: "150px" }} />
          <Footer />
        </>
      )}
      <ToastContainer autoClose={3000} pauseOnHover={false} closeOnClick />
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route
                path="/detail/:contentId"
                element={<ContentDetailPage />}
              />
              <Route
                path="/oauth2/redirect"
                element={<OAuth2RedirectHandler />}
              />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/mypage/edit" element={<ProfileEditPage />} />
              <Route path="/person/:personId" element={<PersonDetailPage />} />
              <Route path="/recommend" element={<WishlistPage />} />
              <Route path="/recommend/ott" element={<RecommendPage />} />
            </Routes>
          </Layout>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
