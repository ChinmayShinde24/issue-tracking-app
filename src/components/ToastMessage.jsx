import React, { useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

function ToastMessage(props) {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Toast
        show={show}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <Toast.Body>{props.message}</Toast.Body>
        <Button
          onClick={() => {
            setShow(false);
          }}
        >
          Close
        </Button>
      </Toast>
    </div>
  );
}

export default ToastMessage;
