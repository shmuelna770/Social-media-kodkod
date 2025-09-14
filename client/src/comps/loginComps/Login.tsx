import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import "../style/Login.css";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3004/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUser(data.user);
      localStorage.setItem("token", data.token);
      alert("התחברת בהצלחה!");
    } catch (err: any) {
      alert("שגיאה: " + err.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="שם משתמש"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="סיסמה"
        onChange={handleChange}
        required
      />
      <button type="submit">היכנס</button>
    </form>
  );
}
