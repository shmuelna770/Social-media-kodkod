import { useState } from "react";
import "../style/Register.css";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3004/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("נרשמת בהצלחה!");
    } catch (err: any) {
      alert("שגיאה:  " + err.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input name="firstName" placeholder="שם פרטי" onChange={handleChange} required />
      <input name="lastName" placeholder="שם משפחה" onChange={handleChange} required />
      <input name="username" placeholder="שם משתמש" onChange={handleChange} required />
      <input type="password" name="password" placeholder="סיסמה" onChange={handleChange} required />
      <button type="submit">הירשם</button>
    </form>
  );
}
