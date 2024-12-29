import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditApplicationModal from './EditApplicationModal';
import '../styles/ApplicationList.css';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/applications', {
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

  const handleEdit = (application) => {
    setEditingApplication(application);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/applications/${editingApplication._id}`,
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

  const handleDelete = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/applications/${applicationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(prev => prev.filter(app => app._id !== applicationId));
      } catch (error) {
        console.error('Failed to delete application', error);
        alert('Failed to delete application');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="application-list">
      <h1>Applications</h1>
      <button onClick={() => navigate('/applications/create')} className="create-button">
        Create Application
      </button>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <ul className="application-list-ul">
          {applications.map((app) => (
            <li key={app._id} className="application-item">
              {Object.entries(app.personalDetails || {}).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
              ))}
              {Object.entries(app.financialDetails || {}).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
              ))}
              <p>
                <strong>Created At:</strong> {new Date(app.createdAt).toLocaleTimeString()}{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
              <div className="application-actions">
                <button onClick={() => handleEdit(app)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(app._id)} className="delete-button">
                  Delete
                </button>
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