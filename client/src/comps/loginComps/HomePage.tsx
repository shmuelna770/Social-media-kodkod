import { Link, useNavigate } from 'react-router';
import { useEffect } from 'react';
import '../../style/HomePage.css';
import logo from '../../assets/x.png';
import log from '../../../public/logo.png';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser?.id) {
                    navigate("/feed"); // מעביר ישר לעמוד פיד אם יש user.id
                }
            }
        } catch (e) {
            console.error("Error reading user from localStorage", e);
        }
    }, [navigate]);

    return (
        <div className="home-container">
            <div className="home-box">
                <img src={logo} alt="KodkodX Logo" className="home-logo" />
                <img src={log} alt="KodkodX Logo Rotated" className="logo-rotated" />

                <h1 className="home-title">Welcome to KodkodX</h1>
                <h2 className="home-subtitle">Your social platform</h2>
                <p className="home-subtitle">Log in or sign up to get started</p>

                <Link to="/Login" className="home-link">Log in</Link>
                <Link to="/Signup" className="home-link">Sign up</Link>
            </div>
        </div>
    );
};

export default HomePage;
