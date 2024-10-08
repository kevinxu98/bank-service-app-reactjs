import React from 'react';
import axios from 'axios';

interface SavingProps {
    onReload: () => void;
}

const token = localStorage.getItem('jwtToken');
const userId = localStorage.getItem('userId');

const Saving: React.FC<SavingProps> = ({ onReload }) => {

    const [amount, setAmount] = React.useState<number>(0);
    const [error, setError] = React.useState<string | null>(null);

    const handleDeposit = async () => {
        try {
            await axios.put(`http://localhost:8000/commands/savingsDeposit/${userId}/${amount}`, null,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAmount(0);
            onReload();
        }
        catch (err: any) {
            setError(err.message);
            console.error(err.message);
        }
    }

    const handleWithdraw = async() => {
        try {
            await axios.put(`http://localhost:8000/commands/savingsWithdrawal/${userId}/${amount}`, null,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAmount(0);
            onReload();
        }
        catch (err: any) {
            setError(err.message);
            console.error(err.message);
        }
    }
    return (
        <div className="card p-4 mb-4">
          <h2 className="text-center mb-4">Saving</h2>
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
}

export default Saving;