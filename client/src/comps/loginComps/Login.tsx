import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router";
import "../../style/Login.css";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userCredentials = { userName: userName, password: password };
    // console.log("Sending login data to server:", userCredentials);

    try {
      const res = await fetch("http://localhost:3004/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      if (data.user.success == true) {
        localStorage.setItem("id", data.user.user.id);
        localStorage.setItem("token",data.user.token)
        navigate('/feed')
      }
      else {
        setMessage("Username or password is incorrect, try again.");
      }
      setUser(data.id);
    }
    catch (err: any) {
      console.error("Error during login:", err);
      setMessage("Error: " + err.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        value={userName}
        name="username"
        placeholder="User name"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Log in</button>

      <div className="message">{message}</div>
    </form>
  );
}
