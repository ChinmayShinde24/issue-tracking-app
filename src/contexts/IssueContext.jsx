import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

import React from 'react';

const IssueContext = createContext();

function IssueProvider({ children }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   fetchIssues();
  // }, []);

  // const fetchIssues = async () => {
  //   try {
  //     setLoading(true);
  //     const resp = await axios.get(
  //       'https://677a5952671ca0306833b719.mockapi.io/api/issue',
  //     );
  //     setIssues(resp.data);
  //   } catch (error) {
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <IssueContext.Provider
      value={{
        issueData: {
          issues,
          setIssues,
        },
        loadingData: {
          loading,
          setLoading,
        },
        errorData: {
          error,
          setError,
        },
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}

export { IssueProvider };

export default IssueContext;

// export const IssueContext = createContext({});
