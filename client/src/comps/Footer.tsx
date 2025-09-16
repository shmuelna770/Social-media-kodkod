import "../style/footer.css"
import { Link } from "react-router";
import { FaUser, FaPlusSquare, FaHome, FaSearch, FaCog } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <button><Link to="/profile"><FaUser size={24} /></Link></button>
      <button> <Link to="/create-post"><FaPlusSquare size={24} /></Link></button>
      <button> <Link to="/feed"><FaHome size={24} /></Link></button>
      <button><Link to="/search"><FaSearch size={24} /></Link></button>
      <button><Link to="/settings"><FaCog size={24} /></Link></button>
    </div>
  );
}