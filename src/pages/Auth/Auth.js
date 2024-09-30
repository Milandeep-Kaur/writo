import React, { useState } from 'react';
import Signup from './Signup';

import Login from './Login';

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true); // true to show login by default

  // Toggle between Login and Signup forms
  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <Login onToggle={handleToggle} />
      ) : (
        <Signup onToggle={handleToggle} />
      )}
    </div>
  );
};

export default Auth;
