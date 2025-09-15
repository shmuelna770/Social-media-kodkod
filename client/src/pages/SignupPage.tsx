import { Link } from "react-router";
import { UserProvider } from "../comps/loginComps/UserContext";
import Register from "../comps/loginComps/Register";
// import GoogleSignIn from "../comps/loginComps/GoogleSignIn";
import "../comps/style/LoginPage.css";
import logo from '../assets/x.png';
function SignupPage() {
    return (
        <UserProvider>
            <div className="login-container">
                <div className="login-box">
                    <img src={logo} alt="KodkodX Logo" />
                    <h2>הרשמה</h2>
                    <Register />
                    <Link to="/Login" className="login-link">כבר יש לך חשבון? התחבר כאן</Link>
                    <h3>או כניסה עם Google</h3>
                    {/* <div className="google-button"> */}
                        {/* <GoogleSignIn /> */}
                    {/* </div> */}
                </div>
            </div>
        </UserProvider>
    );
}

export default SignupPage;
