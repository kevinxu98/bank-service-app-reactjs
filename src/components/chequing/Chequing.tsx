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
    <div>
      <h1>Chequing</h1>
      <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Chequing;