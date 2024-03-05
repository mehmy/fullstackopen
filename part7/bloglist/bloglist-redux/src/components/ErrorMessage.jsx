import React from 'react';

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div id="error" className="error">
      {message}
    </div>
  );
};

export default ErrorMessage;
