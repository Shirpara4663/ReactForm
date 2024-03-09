import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResponseMessage = ({ icon, className, message }) => {
const iconClassName = icon === 'faCircleXmark' ? 'icon-error' : 'icon-success';
  return (
    <div className={className}>
      <FontAwesomeIcon icon={icon} className={iconClassName} />
      {message}
    </div>
  );
};

export default ResponseMessage;
