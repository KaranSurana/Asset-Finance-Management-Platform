import React, { useState } from 'react';
import '../styles/EditApplicationModal.css';

const EditApplicationModal = ({ application, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    personalDetails: { ...application.personalDetails },
    financialDetails: { ...application.financialDetails }
  });

  // handling the update of application, updating any changes in any fields
  const handleChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  // handling the update of application using the function passed from the application list
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Edit Application</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Details</h3>
            {Object.entries(formData.personalDetails).map(([field, value]) => (
              <div key={field} className="form-group">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange('personalDetails', field, e.target.value)}
                  autoComplete="off"
                />
              </div>
            ))}
          </div>

          <div className="form-section">
            <h3>Financial Details</h3>
            {Object.entries(formData.financialDetails).map(([field, value]) => (
              <div key={field} className="form-group">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === 'income' || field === 'expenses' ? 'number' : 'text'}
                  value={value}
                  onChange={(e) => handleChange('financialDetails', field, e.target.value)}
                  autoComplete="off"
                />
              </div>
            ))}
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicationModal;