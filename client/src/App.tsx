import { Route, Routes } from "react-router";
import SinglePostPage from "./pages/SinglePostPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomeFeed from "./pages/HomeFeed";

function App() {
  return (
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/feed" element={<HomeFeed />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/SinglePostPage/:id" element={<SinglePostPage />} />
      </Routes>
  );
}

export default App;
