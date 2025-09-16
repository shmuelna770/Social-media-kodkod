import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import SinglePostPage from "./pages/SinglePostPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomeFeed from "./pages/HomeFeed";
import HomePage from "./comps/loginComps/HomePage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/feed" element={<HomeFeed />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/ProfilePage/:id" element={<ProfilePage />} />
        <Route path="/post/:id" element={<SinglePostPage />} />
      </Routes>
  );
}

export default App;
