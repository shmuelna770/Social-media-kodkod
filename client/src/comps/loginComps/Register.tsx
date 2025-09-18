import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import "../../style/Register.css";
import makeRequest from "../../utils/makeRequest";

export default function Register() {
  const [file, setFile] = useState<File | undefined>()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleOnChange(e: FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList
    }
    setFile(target.files[0])
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let formData;
    if (file) {
      formData = new FormData();
      formData.set('file', file)
      formData.set('firstName', firstName)
      formData.set('lastName', lastName)
      formData.set('userName', userName)
      formData.set('password', password)
      formData.set('status', status)
    }
    else {
      formData = {
        firstName,
        lastName,
        userName,
        password,
        status
      }
    }
    
    try {
      setLoading(true)
      const res = await makeRequest('/user/add', 'POST', formData, file ? true : false)

      setLoading(false)
      if (res.msg === 'User created') {
        navigate('/Login')
      }
      else {
        setMessage(res.msg);
      }

    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
      <input value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
      <input value={userName} placeholder="User Name" onChange={(e) => setUserName(e.target.value)} required />
      <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <input value={status} placeholder="Status" onChange={(e) => setStatus(e.target.value)} />
      <input id="file" type="file" accept="image/*"  onChange={handleOnChange} />
      <button type="submit">Sign Up</button>

      {loading && <p className="loading">Loading...</p>}
      {message && !loading && <p className="failed">{message}</p>}
    </form>
  );
}
