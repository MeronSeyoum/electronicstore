import { useState, useEffect } from 'react';

const useDataFetch = (apiEndpoint) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setFetchedData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { fetchedData, loading, error };
};

export default useDataFetch;







// import React, { useState, useEffect } from 'react';

// const useDataFetch = (apiEndpoint) => {
//   const [fetchedData, setFetchedData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiEndpoint);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const responseData = await response.json();
//         setFetchedData(responseData);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchData();

//     // Clean-up function (optional)
//     return () => {
//       // Perform any clean-up if needed
//     };
//   }, [apiEndpoint]);

//   return { fetchedData, error, loading};
// };

// export default useDataFetch;
