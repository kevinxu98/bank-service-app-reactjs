import React, { useState } from 'react';
import axios from 'axios';

interface ChequingProps {
  onReload: () => void;
}

const token = localStorage.getItem('jwtToken');
const userId = localStorage.getItem('userId');

const Chequing: React.FC<ChequingProps> = ({ onReload }) => {
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleDeposit = async () => {
    try {
      await axios.put(`http://localhost:8000/commands/chequingDeposit/${userId}/${amount}`, null, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        } 
      });
      setAmount(0);
      onReload(); 
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.put(`http://localhost:8000/commands/chequingWithdrawal/${userId}/${amount}`, null, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      setAmount(0);
      onReload(); 
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h2 className="text-center mb-4">Chequing</h2>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary rounded-pill" onClick={handleDeposit}>Deposit</button>
        <button className="btn btn-secondary rounded-pill" onClick={handleWithdraw}>Withdraw</button>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Chequing;