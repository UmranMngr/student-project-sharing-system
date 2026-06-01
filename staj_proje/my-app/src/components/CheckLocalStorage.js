import React, { useEffect } from 'react';

const CheckLocalStorage = () => {
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    console.log('Stored userId:', userId);
  }, []);

  return (
    <div>
      <h1>Check Local Storage</h1>
      <p>Open the console to see the `userId` value.</p>
    </div>
  );
};

export default CheckLocalStorage;
