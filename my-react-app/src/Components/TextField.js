import React from 'react';
import '../Styles/Form.css';

const TextField = ({ type, value, error, placeholder, onChange }) => {
  let label;
  switch (type) {
    case 'full_name':
      label = 'Full Name';
      break;
    case 'password':
      label = 'Password';
      break;
    case 'confirmpassword':
      label = 'Confirm Password';
      break;
    default:
      label = 'Text';
  }

  // Define the error message based on the type
  let errorMessage = '';
  switch (type) {
    case 'full_name':
      errorMessage = 'Full name cannot be empty and should not contain symbols.';
      break;
    case 'password':
      errorMessage = 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.';
      break;
    case 'confirmpassword':
      errorMessage = 'Passwords do not match.';
      break;
    default:
      errorMessage = '';
  }
 
  return (
    <div className="mb-3 position-relative">
      <label className="form-label" htmlFor={`validationServer${type}`}>{label}</label>
      <input
          className={`form-control ${error ? 'is-invalid' : ''}`}
          type={type === 'password' || type === 'confirmpassword' ? 'password' : 'text'}
          id={`validationServer${type}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          />
      {error && <div className="error-block">{type === 'full_name' || type === 'password' ? error : errorMessage}</div>}
    </div>
  );
};

export default TextField;
