import React, { useEffect, useState } from 'react';
import Summary from "../summary/Summary";
import Chequing from '../chequing/Chequing';
import Saving from '../saving/Saving';
import Logout from '../logout/Logout';

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="p-4">
            <h1 className="text-center mb-4">Bank Dashboard</h1>
            {userId && <Summary userId={userId} reloadTrigger={reloadTrigger} />}
            <div className="row">
              <div className="col-md-6">
                <Chequing onReload={handleButtonClick} />
              </div>
              <div className="col-md-6">
                <Saving onReload={handleButtonClick} />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Logout /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;