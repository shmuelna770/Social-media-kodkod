import { Route, Routes } from "react-router";
import SignupPage from './pages/SignupPage';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/Login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
