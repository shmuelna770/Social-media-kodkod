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
                    <h2>Log In</h2>
                    <Login />
                    <Link to="/Signup" className="login-link">Don't have an account? Sign up here</Link>
                    <h3>or sign in with Google</h3>
                    <div className="google-button">
                        <GoogleSignIn />
                    </div>
                </div>
            </div>
        </UserProvider>
    );
}

export default LoginPage;
