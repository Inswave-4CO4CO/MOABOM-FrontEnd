import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
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
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import PersonDetailPage from "./pages/PersonDetailPage";

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
            </Routes>
          </Layout>
        </Router>
        <ToastContainer autoClose={3000} pauseOnHover={false} closeOnClick />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
