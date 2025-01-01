import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditApplicationModal from './EditApplicationModal';
import '../styles/ApplicationList.css';
import config from '../config';
import { Calendar, Clock } from 'lucide-react';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null);
  const navigate = useNavigate();

  //getting all applications
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("You're Not Logged In");
      navigate('/login');
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/applications`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sortedApplications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setApplications(sortedApplications);
      } catch (error) {
        console.error('Failed to fetch applications', error);
      }
    };

    fetchApplications();
  }, [navigate]);

  //if we click on the edit button it gets the application details and set as a state for editing the application details
  const handleEdit = (application) => {
    setEditingApplication(application);
  };

  // handling the update of application, passing it as a prop in edit application modal
  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        
        `${config.API_URL}/applications/${editingApplication._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      setApplications(prev =>
        prev.map(app =>
          app._id === editingApplication._id ? response.data : app
        )
      );
      setEditingApplication(null);
    } catch (error) {
      console.error('Failed to update application', error);
      alert('Failed to update application');
    }
  };

  // handling the deleting of application
  const handleDelete = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `${config.API_URL}/applications/${applicationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        

        setApplications(prev => prev.filter(app => app._id !== applicationId));
      } catch (error) {
        console.error('Failed to delete application', error);
        alert('Failed to delete application');
      }
    }
  };

  // handling logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="application-list">
      <div className="header-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="navbar">
          <button onClick={handleLogout} className="nav-button logout-button">Logout</button>
        </div>
      </div>
      <div className="action-buttons">
        <button onClick={() => navigate('/applications/create')} className="create-button">
          Create Application
        </button>
      </div>
      {applications.length === 0 ? (
        <p className="no-applications">No applications found</p>
      ) : (
        <ul className="application-list-ul">
          {applications.map((app) => (
            <li key={app._id} className="application-item">
              <div className="application-header">
                <div className="application-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{formatDate(app.createdAt)}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>{formatTime(app.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="application-content">
                <div className="details-section">
                  <h3>Personal Details</h3>
                  {Object.entries(app.personalDetails || {}).map(([key, value]) => (
                    <div key={key} className="detail-item">
                      <span className="detail-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="detail-value">{value}</span>
                    </div>
                  ))}
                </div>
                
                {app.financialDetails && (
                  <div className="details-section">
                    <h3>Financial Details</h3>
                    {Object.entries(app.financialDetails).map(([key, value]) => (
                      <div key={key} className="detail-item">
                        <span className="detail-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="detail-value">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="button-group">
                <button className="edit-button" onClick={() => handleEdit(app)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(app._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingApplication && (
        <EditApplicationModal
        application={editingApplication}
        onClose={() => setEditingApplication(null)}
        onSubmit={handleUpdate}
      />
      )}
    </div>
  );
};

export default ApplicationList;