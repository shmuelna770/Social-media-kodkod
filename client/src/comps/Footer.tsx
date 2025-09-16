import "../style/footer.css"
import { FaUser, FaPlusSquare, FaHome, FaSearch, FaCog } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <button><FaUser size={24} /></button>
      <button><FaPlusSquare size={24} /></button>
      <button><FaHome size={24} /></button>
      <button><FaSearch size={24} /></button>
      <button><FaCog size={24} /></button>
    </div>
  );
}
