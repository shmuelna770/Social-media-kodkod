import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Header from "./comps/Header";
import Footer from "./comps/Footer";
import HomeFeed from "./pages/HomeFeed";

function App() {
  return (
    <>
      <div className="posts-container">
        <Header />
        <HomeFeed />
        <Footer />
      </div>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/ProfilePage" element={<ProfilePage userId="u1" />} />
      </Routes>
    </>
  );
}

export default App;
