import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import SearchBox from './SearchBox'; // Assuming SearchBox is the component that contains the search logic
import { logout } from '../actions/userActions';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false); // State to toggle search bar
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch); // Toggle the search bar
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <div className="mobile-header">
            {/* Search Icon or Search Box */}
            <div className="search-icon">
              {!showSearch ? (
                <FaSearch size={20} onClick={toggleSearch} />
              ) : (
                <Route
                  render={({ history }) => (
                    <SearchBox history={history} closeSearch={toggleSearch} />
                  )}
                />
              )}
            </div>

            {/* Logo in Center */}
            <LinkContainer to="/" className="logo-center">
              <Navbar.Brand>
                <img src='/images/logo.jpg' alt='Logo' className="logo" />
              </Navbar.Brand>
            </LinkContainer>

            {/* Cart Icon */}
            <div className="cart-icon">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart size={20} /> Cart
                </Nav.Link>
              </LinkContainer>
            </div>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>

        {/* Custom CSS */}
        <style jsx>{`
          .mobile-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }

          .logo-center {
            flex-grow: 1;
            text-align: center;
            font-size: 20px;
          }

          .search-icon,
          .cart-icon {
            display: flex;
            align-items: center;
          }
          .logo{
            width: 100px;
            height: 70px;
            margin-left: 30px;
          }

          /* Hide hamburger menu on small screens */
          @media (max-width: 390px) {
            .navbar-toggler {
              display: none;
            }

            .logo-center {
              font-size: 18px;
            }

            .search-icon,
            .cart-icon {
              font-size: 16px;
            }

            .fas {
              font-size: 18px;
            }
          }
        `}</style>
      </Navbar>
    </header>
  );
};

export default Header;
