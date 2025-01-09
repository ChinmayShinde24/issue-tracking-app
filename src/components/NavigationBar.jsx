import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/react.svg';
import { Link } from 'react-router';

function NavigationBar() {
  return (
    <div>
      <Navbar expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/issue-tracking-app/issues"
            style={{ color: 'white' }}
          >
            <img src={logo} height={30} width={30} /> Issue Tracking app
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/issue-tracking-app/issues"
                style={{ color: 'white' }}
              >
                Issues
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/issue-tracking-app/create-issue"
                style={{ color: 'white' }}
              >
                Create Issue
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
