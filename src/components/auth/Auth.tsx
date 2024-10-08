import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert('Sign-up successful! Please check your email for confirmation.');
    } catch (error: any) {
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
        window.location.href = '/dashboard'; 
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Authentication</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Auth;