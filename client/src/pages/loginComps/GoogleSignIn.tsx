import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { UserContext } from "../loginComps/UserContext";

export default function GoogleSignIn() {
  const { setUser } = useContext(UserContext);

  const handleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;

    // שולח את הטוקן לשרת כדי לבדוק או ליצור משתמש
    const res = await fetch("http://localhost:5000/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const data = await res.json();

    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Google Sign-In failed")} />;
}
