import { Link } from "react-router";
import { UserProvider } from "../comps/loginComps/UserContext";
import Register from "../comps/loginComps/Register";
import GoogleSignIn from "../comps/loginComps/GoogleSignIn";
import "../style/LoginPage.css";
import logo from '../assets/x.png';
function SignupPage() {
    return (
        <UserProvider>
            <div className="login-container">
                <div className="login-box">
                    <img src={logo} alt="KodkodX Logo" />
                    <h2>Sign Up</h2>
                    <Register />
                    <Link to="/Login" className="login-link">Already have an account? Log in here</Link>
                    <h3>or sign in with Google</h3>
                    <div className="google-button">
                        <GoogleSignIn />
                    </div>
                </div>
            </div>
        </UserProvider>
    );
}

export default SignupPage;
