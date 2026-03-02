import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Temples() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/temples`).then((res) => setItems(res.data));
  }, []);

  const search = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/temples`, { params: { search: q } });
    setItems(res.data);
  };

  return (
    <div>
      <form className="d-flex mb-3" onSubmit={search}>
        <input className="form-control me-2" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn btn-outline-primary">Search</button>
      </form>
      <div className="row">
        {items.map((t) => (
          <div className="col-md-4" key={t._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{t.name}</h5>
                <p className="card-text">{t.location}</p>
                <Link to={`/temples/${t._id}`} className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
