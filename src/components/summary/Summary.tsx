import React, { useState, useEffect } from 'react';
import axios from 'axios';



const testId = process.env.REACT_APP_TESTID;

interface BankRecord {
    version: number;
    id: string;
    savingsAcctBalance: number;
    checkingAcctBalance: number;
    firstName: string;
    lastName: string;
}

function Summary() {
  const [bankRecord, setBankRecord] = useState<BankRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankRecord = async () => {
      try {
        const response = await axios.get('http://localhost:8000/queries/getBankRecord/' + testId); 
        setBankRecord(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBankRecord();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Account Summary</h1>
      {bankRecord ? (
        <div>
          <p>Account Holder: {bankRecord.firstName}</p>
          <p>Chequing Account Balance: {bankRecord.checkingAcctBalance}</p>
          <p>Savings Account Holder: {bankRecord.savingsAcctBalance}</p>
        </div>
      ) : (
        <p>No bank record found.</p>
      )}
    </div>
  );
}

export default Summary;