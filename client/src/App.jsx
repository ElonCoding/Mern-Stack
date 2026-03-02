import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Temples from "./pages/Temples.jsx";
import TempleDetail from "./pages/TempleDetail.jsx";
import Bookings from "./pages/Bookings.jsx";
import Donation from "./pages/Donation.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { useAuth } from "./context/AuthContext.jsx";

export default function App() {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Temples />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/temples/:id" element={<TempleDetail />} />
          <Route path="/bookings" element={user ? <Bookings /> : <Navigate to="/login" />} />
          <Route path="/donate/:id" element={user ? <Donation /> : <Navigate to="/login" />} />
          <Route
            path="/admin"
            element={user && (user.role === "ADMIN" || user.role === "ORGANIZER") ? <AdminDashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
}
