import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import api from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function TempleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingSlot, setBookingSlot] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const [tRes, sRes] = await Promise.all([
          api.get(`/temples/${id}`),
          api.get(`/slots/temple/${id}`)
        ]);
        setTemple(tRes.data);
        setSlots(sRes.data);
      } catch {
        toast.error("Failed to load temple");
        navigate("/temples");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleBook = async (slotId) => {
    if (!user) {
      toast.info("Please login to book a slot");
      navigate("/login");
      return;
    }
    setBookingSlot(slotId);
    try {
      await api.post("/bookings", { templeId: id, slotId });
      toast.success("🎉 Darshan booked successfully!");
      setSlots((prev) =>
        prev.map((s) =>
          s._id === slotId ? { ...s, availableSeats: s.availableSeats - 1 } : s
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingSlot(null);
    }
  };

  if (loading) return <LoadingSpinner text="Loading temple details..." />;
  if (!temple) return null;

  const openSlots = slots.filter((s) => s.status !== "CLOSED");

  return (
    <div className="page-container page-enter">
      {/* Temple Header */}
      <div className="temple-header">
        <div className="temple-header-image">
          {temple.imageUrl ? (
            <img src={temple.imageUrl} alt={temple.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            "🛕"
          )}
        </div>
        <div className="temple-header-content">
          <h1>{temple.name}</h1>
          <div className="temple-meta">
            <span>📍 {temple.location}</span>
            {temple.deity && <span>🙏 {temple.deity}</span>}
            {temple.timings && <span>🕐 {temple.timings}</span>}
          </div>
          {temple.description && (
            <p style={{ marginTop: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              {temple.description}
            </p>
          )}
          <div className="temple-actions">
            <Link to={`/donate/${temple._id}`} className="btn btn-success" id="donate-btn">
              💛 Donate to this Temple
            </Link>
            <Link to="/temples" className="btn btn-ghost">
              ← Back to Temples
            </Link>
          </div>
        </div>
      </div>

      {/* Slots Section */}
      <div className="section-header">
        <h2>Available Darshan Slots</h2>
        <p>{openSlots.length > 0 ? `${openSlots.length} slots available` : "No slots available at the moment"}</p>
      </div>

      {openSlots.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No slots available</h3>
          <p>Please check back later for new darshan slots</p>
        </div>
      ) : (
        <div>
          {openSlots.map((s) => (
            <div className="slot-item" key={s._id} id={`slot-${s._id}`}>
              <div className="slot-info">
                <span className="slot-date">📅 {s.date}</span>
                <span className="slot-time">🕐 {s.startTime} - {s.endTime}</span>
                <span className={`slot-seats ${s.availableSeats > 0 ? "available" : "full"}`}>
                  {s.availableSeats > 0 ? `${s.availableSeats} seats left` : "Full"}
                </span>
                {s.price > 0 && (
                  <span style={{ fontSize: "0.85rem", color: "var(--primary-400)", fontWeight: 600 }}>
                    ₹{s.price}
                  </span>
                )}
              </div>
              <button
                className="btn btn-primary btn-sm"
                disabled={s.availableSeats <= 0 || bookingSlot === s._id}
                onClick={() => handleBook(s._id)}
                id={`book-slot-${s._id}`}
              >
                {bookingSlot === s._id ? "Booking..." : s.availableSeats <= 0 ? "Full" : "Book Now"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
