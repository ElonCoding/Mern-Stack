import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in");
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Login</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" required />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}
