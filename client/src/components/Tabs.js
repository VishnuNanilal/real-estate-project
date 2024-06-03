// src/components/Tabs.js
import React, { useState } from 'react';
import './style/Tabs.css';

const Tabs = ({ children }) => {
    children = React.Children.toArray(children);
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleTabClick = (label) => {
        setActiveTab(label);
    };

    return (
        <div className="tabs">
            <div className="tab-buttons">
                {children.map((child) => (
                    <button
                        key={child.props.label}
                        className={child.props.label === activeTab ? 'active' : ''}
                        onClick={() => handleTabClick(child.props.label)}
                    >
                        {child.props.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {children.map((child) => {
                    if (child.props.label === activeTab) 
                        return <div key={child.props.label}>{child.props.children}</div>;
                    return null;
                })}
            </div>
        </div>
    );
};

export default Tabs;
