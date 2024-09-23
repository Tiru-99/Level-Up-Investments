"use client"; 

import React, { useState, useEffect , ReactNode} from 'react';
import Preloader from './Preloader';

interface PreloaderWrapperProps {
  children: ReactNode;
}

const PreloaderWrapper = ({ children } : PreloaderWrapperProps) => {
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
