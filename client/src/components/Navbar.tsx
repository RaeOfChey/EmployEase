import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

import logo from '../assets/logo.png';
import '../index.css';

const AppNavbar = () => {
  // Set modal display state
  const [showModal, setShowModal] = useState(false);

  // Get current location (route)
  const location = useLocation();

  // Check if the current route matches the nav link
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <>
      <Navbar bg='light' variant='light' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className='d-flex align-items-center'>
            <img
              src={logo}
              alt='EmployEase Logo'
              className='navbar-logo'
            />
            <span className='ms-2 employease-text'>EmployEase</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <Nav.Link
                as={Link}
                to='/'
                className={`nav-link custom-hover ${isActive('/')}`}
              >
                Search for Jobs
              </Nav.Link>
              <Nav.Link
                as={Link}
                to='/saved'
                className={`nav-link custom-hover ${isActive('/saved')}`}
              >
                Saved Jobs
              </Nav.Link>
              {Auth.loggedIn() ? (
                <Nav.Link
                  onClick={Auth.logout}
                  className='nav-link custom-hover'
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link
                  onClick={() => setShowModal(true)}
                  className='nav-link custom-hover'
                >
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for Login/Signup */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
        id="login-modal">
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
