import React, { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import axios from 'axios';
import IssueCard from '../components/IssueCard';
import ToastMessage from '../components/ToastMessage';
import Tabs from '../components/Tabs';
import IssueContext from '../contexts/IssueContext';

function Issues() {
  const { issueData, loadingData, errorData } = useContext(IssueContext);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      loadingData.setLoading(true);
      const resp = await axios.get(
        'https://677a5952671ca0306833b719.mockapi.io/api/issue',
      );
      issueData.setIssues(resp.data);
    } catch (error) {
      errorData.setError(true);
    } finally {
      loadingData.setLoading(false);
    }
  };

  return errorData.error === false ? (
    loadingData.loading ? (
      <Loader />
    ) : issueData.issues.length > 0 ? (
      <div>
        {/* <Tabs /> */}
        <h1>Issues</h1>
        {issueData.issues.map((issue) => {
          return <IssueCard key={issue.id} issue={issue} />;
        })}
      </div>
    ) : (
      <h1>No data found</h1>
    )
  ) : (
    <ToastMessage message="Something went wrong!" />
  );
}

export default Issues;
