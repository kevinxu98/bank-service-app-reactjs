import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Auth from './components/auth/Auth';
import withAuth from './utils/protectRoute';

function App() {
  const ProtectedDashboard = withAuth(Dashboard);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;