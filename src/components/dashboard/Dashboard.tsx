import React, { useState } from 'react';
import Summary from "../summary/Summary";
import Chequing from '../chequing/Chequing';
import Saving from '../saving/Saving';

function Dashboard() {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const handleButtonClick = () => {
    setReloadTrigger(prev => {
        return prev + 1 });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Summary reloadTrigger={reloadTrigger} />
      <Chequing onReload={handleButtonClick} />
      <Saving onReload={handleButtonClick} />
    </div>
  );
}

export default Dashboard;