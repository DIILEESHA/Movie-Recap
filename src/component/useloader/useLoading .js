// useLoading.js
import { useState, useEffect } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (you can replace this with your actual loading logic)
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return loading;
};

export default useLoading;