"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Spinner = () => (
  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
);

const Preloader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 99) return prev + 1; // Increment loading progress
        clearInterval(interval);
        setIsLoadingComplete(true); // Set loading complete state
        return prev; // Stop at 99%
      });
    }, 25); // Adjust the interval time for faster or slower loading

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <AnimatePresence>
        {!isLoadingComplete && ( // Render preloader only while loading is not complete
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -50 }} // Initial state: invisible and shifted up
            animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
            exit={{ opacity: 0, y: -70 }} // Fade out effect when loading is complete
            transition={{ duration: 0.5 }} // Duration of the animation
          >
            <h1 className="text-4xl tracking-wider">
              LEVEL<span className="font-bold tracking-wider">UP</span>
            </h1>
            <p className="text-xl text-gray-600 tracking-wider font-semibold">INVESTMENTS</p>
            <p className="mt-4 text-gray-600 text-lg font-semibold">Unlocking Potential, One Investment at a Time.</p>

            <p className="mt-4 text-gray-600 text-lg">{loadingProgress}% Loading</p>
            
            {/* Spinning Loader Component */}
            <div className="mt-6 flex justify-center">
              <Spinner />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Preloader;
