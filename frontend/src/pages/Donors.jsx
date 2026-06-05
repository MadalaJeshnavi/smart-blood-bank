import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    const fetchDonors = async () => {
      try {
        // Fetch all donors from the new API endpoint
        const res = await axios.get("http://localhost:5002/api/users/donors");
        setDonors(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchDonors();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
          <Link to="/blood-inventory" className="nav-item">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
            <span>Blood Inventory</span>
          </Link>
          <Link to="/donors" className="nav-item active">
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
          <h1 className="page-title">Our Donors</h1>
          <p className="page-subtitle">Meet our blood donors who save lives</p>
        </div>

        {/* Donors Grid */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : donors.length > 0 ? (
          <div className="stats-grid">
            {donors.map((donor) => (
              <div className="stat-card" key={donor._id}>
                <div className="stat-icon red">
                  <svg viewBox="0 0 24 24" fill="#dc3545">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="stat-value" style={{ fontSize: '20px' }}>{donor.name}</div>
                <div className="stat-label">
                  <span className={`blood-type ${donor.bloodType?.toLowerCase().replace('+', 'positive').replace('-', 'negative')}`}>
                    {donor.bloodType}
                  </span>
                </div>
                <div className="stat-label">{donor.email}</div>
                <div className="stat-label">{donor.phone}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="content-card text-center">
            <p style={{ color: '#6c757d' }}>No donors found.</p>
          </div>
        )}

        {/* Donors Table */}
        {donors.length > 0 && (
          <div className="content-card">
            <h2 className="card-title">All Donors List</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Type</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor._id}>
                    <td>{donor.name}</td>
                    <td>
                      <span className={`blood-type ${donor.bloodType?.toLowerCase().replace('+', 'positive').replace('-', 'negative')}`}>
                        {donor.bloodType}
                      </span>
                    </td>
                    <td>{donor.email}</td>
                    <td>{donor.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donors;
