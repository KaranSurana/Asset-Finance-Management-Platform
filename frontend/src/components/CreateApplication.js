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
            {["income", "expenses", "assets", "liabilities"].map((field) => (
              <div className="form-group" key={field}>
                <div className="input-container">
                  <input
                    type={field === "income" || field === "expenses" ? "number" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="info-icon"
                    onClick={(e) => {
                      const tooltip = e.target.nextSibling;
                      tooltip.style.display =
                        tooltip.style.display === "block" ? "none" : "block";
                    }}
                    onMouseEnter={(e) => {
                      e.target.nextSibling.style.display = "block";
                    }}
                    onMouseLeave={(e) => {
                      e.target.nextSibling.style.display = "none";
                    }}
                  >
                    i
                  </span>
                  <div className="tooltip">
                    {field === "income" || field === "expenses"
                      ? "Accepts numbers only"
                      : "Accepts text and numbers"}
                  </div>
                </div>
              </div>
            ))}
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
}

export default CreateApplication;