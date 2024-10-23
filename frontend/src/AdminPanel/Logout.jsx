import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage data
    localStorage.clear();

    // Show alert message
    alert("You have been logged out");

    // Redirect to the home page
    navigate('/');
  }, [navigate]);

  return null; // No need to render anything, as we're handling everything with alert and redirect
};

export default Logout;
