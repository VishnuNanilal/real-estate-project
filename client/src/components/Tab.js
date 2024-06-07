import React from 'react';

const Tab = ({ label, children }) => {
  return <div className="tab" label={label}>{children}</div>;
};

export default Tab;
