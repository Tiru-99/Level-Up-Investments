"use client"; 

import React, { useState, useEffect } from 'react';
import Preloader from './Preloader';

const PreloaderWrapper = ({ children } : any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer); // Clean up
  }, []);

  return (
    <>
      {loading ? <Preloader /> : children}
    </>
  );
};

export default PreloaderWrapper;
