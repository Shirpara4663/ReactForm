import React from 'react';

const EmailField = ({ value, error, onChange }) => {
  return (
    <div className="mb-3" style={{ marginTop: '20px' }}>
      <label htmlFor="validationServer03" className="form-label" style={{ marginBottom: '20px' }}>Email Address</label>
      <fieldset style={{ border: 'none', position: 'relative', paddingTop: '-5px' }}> 
        <legend style={{ display: '', fontSize: '12px', position: 'absolute', top: '-10px', left: '10px', backgroundColor:'white', padding: '0 5px', zIndex: '1' }}>E-mail Address</legend>
        <input
          className={`form-control ${error ? 'is-invalid' : ''}`}
          type='email'
          value={value}
          id="validationServer03"
          onChange={onChange}
          style={{ padding: '10px', position: 'relative', zIndex: '0' }}
        />
      </fieldset>
      {error && <div className="invalid-feedback" style={{ display: 'block' }}>{error}</div>}
    </div>
  );
};

export default EmailField;
