import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; 
import axios from 'axios'; 

const Auth: React.FC = ()=> {
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Bank App</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {isSignUp && (
              <>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" onClick={isSignUp ? handleSignUp : handleSignIn}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
              <button
                className="btn btn-link"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;