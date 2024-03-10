import React from 'react';

const EmailField = ({ value, error, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor="validationServer03" className="form-label">Email Address</label>
      <fieldset className="fieldset-style"> 
        <legend className='text-left legend-style'>Email Address *</legend>
        <input
          className={`form-control ${error ? 'is-invalid' : ''}`}
          type='email'
          value={value}
          id="validationServer03"
          onChange={onChange}
          style={{ padding: '10px', position: 'relative', yIndex: '0' }}
        />
      </fieldset>
      {error && <div className="error-block">{error}</div>}
    </div>
  );
};

export default EmailField;
