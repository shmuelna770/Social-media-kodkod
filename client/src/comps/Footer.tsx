import "../style/footer.css"
import { Link, useNavigate } from "react-router";
import { FaUser, FaPlusSquare, FaHome, FaSearch, FaSignOutAlt } from "react-icons/fa";



export default function Footer() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  const id = localStorage.getItem("id")
  return (
    <div className="footer">
      <Link to={`/feed/profile-page/${id}`}><FaUser size={24} /></Link>
      <Link to='add-new-post'><FaPlusSquare size={24} /></Link>
      <Link to=''><FaHome size={24} /></Link>
      <Link to='search'><FaSearch size={24} /></Link>
      <Link to='/login' onClick={handleLogout}><FaSignOutAlt size={24} /></Link>
    </div>
  );
}