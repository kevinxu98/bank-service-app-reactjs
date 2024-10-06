import React from 'react';
import axios from 'axios';

interface SavingProps {
    onReload: () => void;
}

const id = process.env.REACT_APP_TESTID;

const Saving: React.FC<SavingProps> = ({ onReload }) => {

    const [amount, setAmount] = React.useState<number>(0);
    const [error, setError] = React.useState<string | null>(null);

    const handleDeposit = async () => {
        try {
            await axios.put(`http://localhost:8000/commands/savingsDeposit/${id}/${amount}`);
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
            await axios.put(`http://localhost:8000/commands/savingsWithdrawal/${id}/${amount}`);
            setAmount(0);
            onReload();
        }
        catch (err: any) {
            setError(err.message);
            console.error(err.message);
        }
    }
    return (
        <div>
            <h1>Saving</h1>
            <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw}>Withdraw</button>
            {error && <div>Error: {error}</div>}
        </div>
    )
}

export default Saving;