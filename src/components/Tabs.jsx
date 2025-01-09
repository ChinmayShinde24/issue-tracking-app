import React from 'react';
import { Nav } from 'react-bootstrap';

function Tabs() {
  return (
    <div>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link>Pending</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>In Progress</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>Resolved</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Tabs;
