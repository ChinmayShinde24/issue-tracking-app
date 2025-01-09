import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Spinner />
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
