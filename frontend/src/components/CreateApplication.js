import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateApplication.css';
import config from '../config';

const CreateApplication = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    income: '',
    expenses: '',
    assets: '',
    liabilities: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // handling the creation of application
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `${config.API_URL}/applications`,
        {
          personalDetails: {
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
          },
          financialDetails: {
            income: formData.income,
            expenses: formData.expenses,
            assets: formData.assets,
            liabilities: formData.liabilities,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      navigate('/');
    } catch (error) {
      console.error('Failed to create application', error);
    }
  };

  return (
    <div className="create-application-container">
      <div className="create-application-form">
        <h1>Create Application</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Financial Details</h3>
            <div className="form-group">
              <input
                type="number"
                name="income"
                placeholder="Income"
                value={formData.income}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="expenses"
                placeholder="Expenses"
                value={formData.expenses}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="assets"
                placeholder="Assets"
                value={formData.assets}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="liabilities"
                placeholder="Liabilities"
                value={formData.liabilities}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-buttons">
            <button type="button" onClick={() => navigate('/')} className="back-button">
              Back
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApplication;