import { Route, Routes } from "react-router";
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/ProfilePage" element={<ProfilePage userId="u1"/>} />
    </Routes>
  );
}

export default App;
