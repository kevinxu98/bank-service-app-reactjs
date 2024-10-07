import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Redirect } from 'react-router-dom';

const withAuth = (Component: React.FC) => {
  return (props: any) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const session = supabase.auth.session();
      if (session) {
        setAuthenticated(true);
      } else {
        supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        });
      }
    }, []);

    if (!authenticated) {
      return <Redirect to="/auth" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;