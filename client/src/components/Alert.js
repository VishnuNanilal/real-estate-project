import React from 'react';
import './style/Alert.css'

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button className="alert-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Alert;
