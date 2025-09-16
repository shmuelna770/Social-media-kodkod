import "../style/footer.css"
import { Link } from "react-router";
import { FaUser, FaPlusSquare, FaHome, FaSearch, FaCog } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <Link to='profile-page'><FaUser size={24} /></Link>
      <Link to='add-new-post'><FaPlusSquare size={24} /></Link>
      <Link to=''><FaHome size={24} /></Link>
      <button> <Link to='Search'><FaSearch size={24} /></Link></button>
      <button><FaCog size={24} /></button>
    </div>
  );
}