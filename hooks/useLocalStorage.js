import { useState, useEffect } from 'react';

// Custom hook for retrieving data from local storage
function useLocalStorage(key, initialValue) {
  // Initialize state with the value from local storage, or the initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get item from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or return initialValue if undefined
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Return initialValue on error
      console.error('Error retrieving data from local storage:', error);
      return initialValue;
    }
  });

  // Update local storage when storedValue changes
  useEffect(() => {
    try {
      // Serialize state to JSON and store in local storage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
