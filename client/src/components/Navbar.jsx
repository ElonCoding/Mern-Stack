import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">DarshanEase</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Temples</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">My Bookings</Link>
              </li>
            )}
            {user && (user.role === "ADMIN" || user.role === "ORGANIZER") && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <span className="navbar-text me-2">{user.name}</span>
                <button className="btn btn-outline-secondary" onClick={() => { logout(); nav("/"); }}>Logout</button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
