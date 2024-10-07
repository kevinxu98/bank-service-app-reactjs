import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Navigate } from 'react-router-dom';

const withAuth = (Component: React.FC) => {
  return (props: any) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setAuthenticated(true);
          setLoading(false);
        } else {
          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
              setAuthenticated(true);
            } else {
              setAuthenticated(false);
            }
            setLoading(false);
          });

          return () => {
            subscription.unsubscribe();
          };
        }
      };

      checkSession();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/auth" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;