import React from 'react';

const CancelButton = () => {
  return (
    <button className='btn btn-secondary me-2' type='button'>Cancel</button>
  );
};

const SubmitButton = () => {
  return (
    <button className='btn btn-primary' type='submit'>Submit</button>
  );
};

export { CancelButton, SubmitButton };
