import React, { useEffect } from 'react';


const RefreshPage = ({method}) => {
    useEffect(() => {
      const intervalId = setInterval(() => {
        method();
      }, 3000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
        <div></div>
    );
  };
  
  export default RefreshPage;
  