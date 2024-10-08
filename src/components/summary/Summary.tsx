import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface BankRecord {
  version: number;
  id: string;
  savingsAcctBalance: number;
  chequingAcctBalance: number;
  firstName: string;
  lastName: string;
}

interface SummaryProps {
  userId: string;
  reloadTrigger: number;
}

function Summary({ userId, reloadTrigger }: SummaryProps) {
  const [bankRecord, setBankRecord] = useState<BankRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBankRecord = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // retrieve the JWT token from local storage
        const response = await axios.get(`http://localhost:8000/queries/getBankRecord/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBankRecord(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBankRecord();
  }, [userId, reloadTrigger]);

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
          <p>Account Holder: {bankRecord.firstName} {bankRecord.lastName}</p>
          <p>Chequing Account Balance: {bankRecord.chequingAcctBalance}</p>
          <p>Savings Account Balance: {bankRecord.savingsAcctBalance}</p>
        </div>
      ) : (
        <p>No bank record found.</p>
      )}
    </div>
  );
}

export default Summary;