import { useNavigate } from "react-router";
import "../style/SettingsMenu.css";

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/Login"); 
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
