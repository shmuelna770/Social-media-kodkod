import { useState } from "react";
import { useNavigate } from "react-router";
import "../../style/Register.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newUser = { firstName, lastName, userName, password };
    console.log("Sending user data to server:", newUser);

    try {
      const res = await fetch("http://localhost:3004/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (!res.ok) {
        console.error("Server error:", data.error);
        throw new Error(data.error);
      }

      if (res.ok) {
        navigate('/Login')
      }

      setMessage(data.msg);
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input value={firstName} placeholder="שם פרטי" onChange={(e) => setFirstName(e.target.value)} required />
      <input value={lastName} placeholder="שם משפחה" onChange={(e) => setLastName(e.target.value)} required />
      <input value={userName} placeholder="שם משתמש" onChange={(e) => setUserName(e.target.value)} required />
      <input type="password" value={password} placeholder="סיסמה" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">הירשם</button>

      <div className="message">{message}</div>
    </form>
  );
}
