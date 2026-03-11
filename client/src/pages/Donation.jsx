import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Donation() {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [amount, setAmount] = useState(100);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/temples/${id}`).then((res) => setTemple(res.data));
  }, [id]);

  const donate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/donations`, { templeId: id, amount }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Donation recorded");
    } catch {
      toast.error("Donation failed");
    }
  };

  if (!temple) return <div>Loading...</div>;

  return (
    <div className="row">
      <div className="col-md-6">
        <h3>Donate to {temple.name}</h3>
        <form onSubmit={donate}>
          <div className="mb-3">
            <label>Amount</label>
            <input type="number" min="1" className="form-control" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <button className="btn btn-success">Donate</button>
        </form>
      </div>
    </div>
  );
}
