import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateApplication.css';
import config from '../config';

const CreateApplication = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const navigate = useNavigate();

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
            name,
            address,
            phone,
          },
          financialDetails: {
            income,
            expenses,
            assets,
            liabilities,
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
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Assets"
            value={assets}
            onChange={(e) => setAssets(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Liabilities"
            value={liabilities}
            onChange={(e) => setLiabilities(e.target.value)}
            required
          />
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
