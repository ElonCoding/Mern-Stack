import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

export default function TempleDetail() {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/temples/${id}`).then((res) => setTemple(res.data));
    axios.get(`${import.meta.env.VITE_API_URL}/slots/temple/${id}`).then((res) => setSlots(res.data));
  }, [id]);

  const book = async (slotId) => {
    if (!user) return toast.error("Login required");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, { templeId: id, slotId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Booked");
      setSlots((prev) => prev.map((s) => s._id === slotId ? { ...s, availableSeats: s.availableSeats - 1 } : s));
    } catch {
      toast.error("Booking failed");
    }
  };

  if (!temple) return <div>Loading...</div>;

  return (
    <div>
      <h3>{temple.name}</h3>
      <p>{temple.location}</p>
      <p>{temple.description}</p>
      <Link className="btn btn-outline-success mb-3" to={`/donate/${temple._id}`}>Donate</Link>
      <h5>Slots</h5>
      <ul className="list-group">
        {slots.map((s) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={s._id}>
            <span>{s.date} {s.startTime}-{s.endTime} | Available: {s.availableSeats}</span>
            <button className="btn btn-primary" disabled={s.availableSeats <= 0} onClick={() => book(s._id)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
