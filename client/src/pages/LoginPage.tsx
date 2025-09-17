import { UserProvider } from "../comps/loginComps/UserContext";
import Login from "../comps/loginComps/Login";
import GoogleSignIn from "../comps/loginComps/GoogleSignIn";
import "../style/LoginPage.css";

import logo from '../assets/x.png';
import { Link } from "react-router";

function LoginPage() {
    return (
        <UserProvider>
            <div className="login-container">
                <div className="login-box">
                    <img src={logo} alt="KodkodX Logo" />
                    <h2>כניסה</h2>
                    <Login />
                    <Link to="/Signup" className="login-link">אין לך חשבון? הירשם כאן</Link>
                    <h3>או כניסה עם Google</h3>
                    <div className="google-button">
                        <GoogleSignIn />
                    </div>
                </div>
            </div>
        </UserProvider>
    );
}

export default LoginPage;
