import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [temples, setTemples] = useState([]);
  const [form, setForm] = useState({ name: "", location: "" });
  const [slotForm, setSlotForm] = useState({ temple: "", date: "", startTime: "", endTime: "", capacity: 1 });
  const token = localStorage.getItem("token");

  const loadTemples = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/temples`);
    setTemples(res.data);
  };

  useEffect(() => {
    loadTemples();
  }, []);

  const createTemple = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/temples`, form, { headers: { Authorization: `Bearer ${token}` } });
      setForm({ name: "", location: "" });
      toast.success("Temple created");
      loadTemples();
    } catch {
      toast.error("Failed");
    }
  };

  const createSlot = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/slots`, slotForm, { headers: { Authorization: `Bearer ${token}` } });
      setSlotForm({ temple: "", date: "", startTime: "", endTime: "", capacity: 1 });
      toast.success("Slot created");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div>
      <h3>Admin Dashboard</h3>
      <div className="row">
        <div className="col-md-6">
          <h5>Create Temple</h5>
          <form onSubmit={createTemple}>
            <div className="mb-2">
              <label>Name</label>
              <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="mb-2">
              <label>Location</label>
              <input className="form-control" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
        <div className="col-md-6">
          <h5>Create Slot</h5>
          <form onSubmit={createSlot}>
            <div className="mb-2">
              <label>Temple</label>
              <select className="form-select" value={slotForm.temple} onChange={(e) => setSlotForm({ ...slotForm, temple: e.target.value })} required>
                <option value="">Select</option>
                {temples.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
            <div className="mb-2">
              <label>Date</label>
              <input className="form-control" value={slotForm.date} onChange={(e) => setSlotForm({ ...slotForm, date: e.target.value })} placeholder="YYYY-MM-DD" required />
            </div>
            <div className="mb-2">
              <label>Start Time</label>
              <input className="form-control" value={slotForm.startTime} onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })} placeholder="HH:MM" required />
            </div>
            <div className="mb-2">
              <label>End Time</label>
              <input className="form-control" value={slotForm.endTime} onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })} placeholder="HH:MM" required />
            </div>
            <div className="mb-2">
              <label>Capacity</label>
              <input className="form-control" type="number" min="1" value={slotForm.capacity} onChange={(e) => setSlotForm({ ...slotForm, capacity: Number(e.target.value) })} required />
            </div>
            <button className="btn btn-primary">Create Slot</button>
          </form>
        </div>
      </div>
      <h5 className="mt-4">Temples</h5>
      <ul className="list-group">
        {temples.map((t) => <li key={t._id} className="list-group-item">{t.name} - {t.location}</li>)}
      </ul>
    </div>
  );
}
