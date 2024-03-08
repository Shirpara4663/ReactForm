import React from 'react';

const ContactField = ({ value, error, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">Contact Number</label>
      <input
        className={`form-control ${error ? 'is-invalid' : ''}`}
        type='text'
        placeholder='Contact Number'
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default ContactField;
