import { useNavigate } from "react-router";
import "../style/SettingsMenu.css";

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  return (
    <div className="settings-container">
      <div className="settings-menu">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
