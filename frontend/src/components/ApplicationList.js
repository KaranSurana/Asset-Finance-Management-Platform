import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ApplicationList.css';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
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
    </div>
  );
};

export default ApplicationList;