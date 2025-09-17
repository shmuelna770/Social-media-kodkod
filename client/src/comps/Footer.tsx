import "../style/footer.css"
import { Link } from "react-router";
import { FaUser, FaPlusSquare, FaHome, FaSearch, FaCog } from "react-icons/fa";



export default function Footer() {

  const id = localStorage.getItem("id")
  return (
    <div className="footer">
      <Link to={`/feed/profile-page/${id}`}><FaUser size={24} /></Link>
      <Link to='add-new-post'><FaPlusSquare size={24} /></Link>
      <Link to=''><FaHome size={24} /></Link>
      <Link to='search'><FaSearch size={24} /></Link>
      <Link to='settings'><FaCog size={24} /></Link>
    </div>
  );
}