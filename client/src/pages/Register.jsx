import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success("Registered");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Register</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" required />
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
}
