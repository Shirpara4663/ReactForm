import React from 'react';
import '../Styles/Form.css';

const CancelButton = ({ onClick }) => {
  return (
    <button className='btn-cancel me-3' type='button' onClick={onClick}>
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
