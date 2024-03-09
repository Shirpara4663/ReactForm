import React from 'react';
import './Form.css';

const CancelButton = () => {
  return (
    <button className='btn-cancel me-3' type='button'>
      Cancel
    </button>
  );
};

const SubmitButton = () => {
  return (
    <button className='btn-submit ' type='submit'>
      Submit
    </button>
  );
};

export { CancelButton, SubmitButton };
