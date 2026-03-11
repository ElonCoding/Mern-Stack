import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Bookings() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/me`, { headers: { Authorization: `Bearer ${token}` } });
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Cancelled");
      load();
    } catch {
      toast.error("Cancellation failed");
    }
  };

  return (
    <div>
      <h3>My Bookings</h3>
      <ul className="list-group">
        {items.map((b) => (
          <li key={b._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{b.temple?.name} | {b.slot?.date} {b.slot?.startTime}-{b.slot?.endTime} | {b.status}</span>
            {b.status === "CONFIRMED" && <button className="btn btn-outline-danger" onClick={() => cancel(b._id)}>Cancel</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
