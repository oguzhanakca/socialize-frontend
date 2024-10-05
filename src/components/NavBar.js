import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

function NavBar() {
  return (
    <Navbar expand="md" className={styles.NavBar} id="navbar">
      <Container>
        <Navbar.Brand className={styles.Brand} href="#home">
          Socialize
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-end">
          <Nav className="ms-auto">
            <NavLink
              className={({ isActive }) =>
                styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
              }
              to="/about"
            >
              About
            </NavLink>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavLink to="/profile">Action</NavLink>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
