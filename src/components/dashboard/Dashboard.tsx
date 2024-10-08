import React, { useEffect, useState } from 'react';
import Summary from "../summary/Summary";
import Chequing from '../chequing/Chequing';
import Saving from '../saving/Saving';

function Dashboard() {
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);
  }, []);

  const handleButtonClick = () => {
    setReloadTrigger(prev => {
        return prev + 1 });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {userId && <Summary userId={userId} reloadTrigger={reloadTrigger} />}
      <Chequing onReload={handleButtonClick} />
      <Saving onReload={handleButtonClick} />
    </div>
  );
}

export default Dashboard;