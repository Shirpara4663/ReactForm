import React from 'react';
import InputMask from 'react-input-mask';

const ContactField = ({ value, error, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">Contact Number</label>
      <InputMask
        className={`form-control ${error ? 'is-invalid' : ''}`}
        mask="999-999-9999"
        placeholder='Contact Number'
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default ContactField;
