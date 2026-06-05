import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import socket from "../socket";

function Emergency() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    bloodType: "",
    hospital: "",
    units: "",
    urgency: "normal",
    contact: "",
    message: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/emergency");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequests();

    socket.on("emergency", (data) => {
      setRequests((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("emergency");
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5002/api/emergency/create", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Emergency request submitted successfully!");
      setFormData({
        bloodType: "",
        hospital: "",
        units: "",
        urgency: "normal",
        contact: "",
        message: ""
      });
    } catch (err) {
      alert("Failed to submit request. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app-layout">
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
          <Link to="/donors" className="nav-item">
            <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            <span>Donors</span>
          </Link>
          <Link to="/emergency" className="nav-item active">
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

      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Emergency Requests</h1>
          <p className="page-subtitle">Request blood in emergency situations</p>
        </div>

        <div className="emergency-alert">
          <div className="emergency-icon">
            <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div className="emergency-content">
            <h3>Emergency Blood Request</h3>
            <p>In case of a medical emergency, submit your request here and we'll notify available donors.</p>
          </div>
        </div>

        <div className="content-card">
          <h2 className="card-title">Submit Emergency Request</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Blood Type Required</label>
                <select 
                  className="form-input"
                  value={formData.bloodType}
                  onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                  required
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Units Required</label>
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Number of units"
                  value={formData.units}
                  onChange={(e) => setFormData({...formData, units: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Hospital Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Hospital name and address"
                  value={formData.hospital}
                  onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input 
                  type="tel" 
                  className="form-input"
                  placeholder="Your contact number"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Urgency Level</label>
                <select 
                  className="form-input"
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Additional Message</label>
              <textarea 
                className="form-input"
                placeholder="Any additional information..."
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit Emergency Request</button>
          </form>
        </div>

        <div className="content-card">
          <h2 className="card-title">Recent Emergency Requests</h2>
          {requests.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Blood Type</th>
                  <th>Hospital</th>
                  <th>Units</th>
                  <th>Urgency</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.slice(0, 10).map((req) => (
                  <tr key={req._id}>
                    <td>
                      <span className={`blood-type ${req.bloodType?.toLowerCase().replace('+', 'positive').replace('-', 'negative')}`}>
                        {req.bloodType}
                      </span>
                    </td>
                    <td>{req.hospital}</td>
                    <td>{req.units}</td>
                    <td>
                      <span className={`badge ${req.urgency === 'critical' ? 'badge-danger' : req.urgency === 'urgent' ? 'badge-warning' : 'badge-info'}`}>
                        {req.urgency}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center" style={{ color: '#6c757d' }}>No emergency requests at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Emergency;

