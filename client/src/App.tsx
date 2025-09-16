import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
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
        <Route path="/ProfilePage" element={<ProfilePage userId="u1" />} />
      </Routes>
  );
}

export default App;
