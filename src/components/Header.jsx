import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../img/logo.png';
import { AppContext } from '../contexts/AppContext';

const Header = () => {
  const { curUser, setCurUser, getUsers } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurUser(null);
    sessionStorage.removeItem('curUser');
    getUsers();
    navigate('/login');
  };

  return (
    <Navbar className="bg-blue-500 p-4" collapseOnSelect expand="md">
    <Container className="mx-auto">
      <Navbar.Brand>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="mr-2" />
          <div className="font-bold text-white">EasyPay</div>
        </Link>
      </Navbar.Brand>
      {curUser ? (
        <>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="border-0 bg-white text-blue-500"
          />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link disabled className="text-white">
                Hello, {curUser.name}!
              </Nav.Link>
              {curUser.permission === 'admin' && (
                <>
                  <Nav.Link onClick={() => navigate('/users')} className="text-danger">
                    Users
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate('/cards')} className="text-danger">
                    All cards
                  </Nav.Link>
                </>
              )}
              <Nav.Link onClick={() => navigate('/')} className="text-white">
                Home
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/account')} className="text-white">
                Account
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-white">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        <Nav.Link onClick={handleLogout} className="text-white">
          Login
        </Nav.Link>
      )}
    </Container>
  </Navbar>
  
  );
};

export default Header;
