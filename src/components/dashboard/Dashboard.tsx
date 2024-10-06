import React, { useState } from 'react';
import Summary from "../summary/Summary";
import Button from "../Button";

function Dashboard() {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const handleButtonClick = () => {
    setReloadTrigger(prev => prev + 1);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleButtonClick} />
      <Summary reloadTrigger={reloadTrigger} />
    </div>
  );
}

export default Dashboard;