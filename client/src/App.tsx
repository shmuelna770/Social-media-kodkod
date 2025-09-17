import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomeFeed from "./pages/HomeFeed";
import HomePage from "./comps/loginComps/HomePage";
import AddNewPost from "./comps/AddNewPost";
import Feed from "./pages/Feed";
import SearchPage from "./comps/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Signup" element={<SignupPage />} />
      <Route path="/feed" element={<HomeFeed />} >
        <Route path="" element={<Feed />} />
        <Route path="add-new-post" element={<AddNewPost />} />
        <Route path="profile-page/:id" element={<ProfilePage />} />
        <Route path="settings" element={<div>Settings Page</div>} />
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="/Login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
