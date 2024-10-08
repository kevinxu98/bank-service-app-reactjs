import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; 
import axios from 'axios'; 

const Auth = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
  
      const userId = data.user?.id;
      const token = data.session?.access_token;
  
      if (!userId || !token) {
        throw new Error('User ID or token is missing');
      }
  
      const response = await axios.post(
        'http://localhost:8000/commands/createBankRecord',
        {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          chequingAcctBalance: 0,
          savingsAcctBalance: 0
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      console.log('Axios response:', response);
  
      alert('Sign-up successful! Please use your credentials to sign in.');
      // window.location.href = '/dashboard';
  
    } catch (error: any) {
      console.error('Error during sign-up:', error);
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const token = data.session?.access_token;
      if (token) {
        localStorage.setItem('jwtToken', token); 
        localStorage.setItem('userId', data.user?.id);
        window.location.href = '/dashboard'; 
      }

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      {isSignUp ? (
        <>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </>
      ) : null}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {isSignUp ? (
        <button onClick={handleSignUp}>Sign Up</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;