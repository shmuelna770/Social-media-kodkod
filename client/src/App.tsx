import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomeFeed from "./pages/HomeFeed";

function App() {
  return (
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/feed" element={<HomeFeed />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/ProfilePage" element={<ProfilePage userId="u1" />} />
      </Routes>
  );
}

export default App;
