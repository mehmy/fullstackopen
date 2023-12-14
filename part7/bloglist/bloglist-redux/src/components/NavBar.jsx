import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = ({ user }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/blogs">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
          <Navbar.Collapse>
            <Navbar.Text>
              {user ? (
                <em>{user.name} logged in</em>
              ) : (
                <Link to="/login">login</Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
