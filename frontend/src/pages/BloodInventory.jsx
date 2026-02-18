import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function BloodInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    const fetchInventory = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/blood");
        setInventory(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchInventory();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Group blood by type
  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const groupedBlood = bloodTypes.map(type => ({
    type,
    units: inventory.filter(b => b.bloodType === type).reduce((acc, b) => acc + b.quantity, 0)
  }));

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.31 7 20 9.69 20 13V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V13C4 9.69 6.69 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2Z"/>
              </svg>
            </div>
            <span className="sidebar-logo-text">Blood Bank</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            <span>Dashboard</span>
          </Link>
          <Link to="/search" className="nav-item">
            <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <span>Search Blood</span>
          </Link>
          <Link to="/blood-inventory" className="nav-item active">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
            <span>Blood Inventory</span>
          </Link>
          <Link to="/donors" className="nav-item">
            <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            <span>Donors</span>
          </Link>
          <Link to="/emergency" className="nav-item">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            <span>Emergency</span>
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <svg viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Blood Inventory</h1>
          <p className="page-subtitle">View available blood units in the bank</p>
        </div>

        {/* Blood Type Cards */}
        <div className="stats-grid">
          {groupedBlood.map((blood) => (
            <div className="stat-card" key={blood.type}>
              <div className={`stat-icon ${blood.units > 0 ? 'red' : 'orange'}`}>
                <svg viewBox="0 0 24 24" fill={blood.units > 0 ? "#dc3545" : "#6c757d"}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="stat-value">{blood.units}</div>
              <div className="stat-label">Units of {blood.type}</div>
            </div>
          ))}
        </div>

        {/* Inventory Table */}
        <div className="content-card">
          <h2 className="card-title">All Blood Units</h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : inventory.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Blood Type</th>
                  <th>Donor Name</th>
                  <th>Location</th>
                  <th>Quantity</th>
                  <th>Date Collected</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <span className={`blood-type ${item.bloodType?.toLowerCase().replace('+', 'positive').replace('-', 'negative')}`}>
                        {item.bloodType}
                      </span>
                    </td>
                    <td>{item.donor?.name || "Unknown"}</td>
                    <td>{item.location || "N/A"}</td>
                    <td>{item.quantity} units</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className="badge badge-success">Available</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center" style={{ color: '#6c757d' }}>No blood units in inventory.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BloodInventory;
