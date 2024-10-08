import React from 'react';
import { supabase } from '../../supabaseClient';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  return (
    <div className="d-grid gap-2 mt-5">
      <button className="btn btn-danger rounded-pill" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;