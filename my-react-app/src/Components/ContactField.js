import React from 'react';
import InputMask from 'react-input-mask';
import '../Styles/Form.css';

const ContactField = ({ value, error, onChange }) => {
  return (
    <div className="mb-3" >
      <label className="form-label">Contact Number</label>
      <fieldset className="fieldset-style"> 
        <legend className='text-left legend-style'>Contact Number *</legend>
        <InputMask
          className={`form-control ${error ? 'is-invalid' : ''}`}
          mask="999-999-9999"
          value={value}
          onChange={onChange}
          style={{ padding: '10px', position: 'relative', yIndex: '0' }}
        />
      </fieldset>
      {error && <div className="error-block">{error}</div>}
    </div>
  );
};

export default ContactField;
