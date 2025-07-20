import React from 'react';
import { TABS } from '../../utils/constants';
import './styles.css';


function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: TABS.BUILDER, label: 'Schema Builder' },
    { id: TABS.JSON, label: 'JSON Preview' }
  ];

  return (
    <div className="tab-navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabNavigation;