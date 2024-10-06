import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

function NavBar() {
  return (
    <Navbar expand="md" className={styles.NavBar} id="navbar">
      <Container>
        <NavLink className={styles.Brand} to="/">
          Socialize
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-end">
          <Nav className="ms-auto">
            <NavLink
              className={({ isActive }) =>
                styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
              }
              to="/signin"
            >
              <i class="fa-solid fa-right-to-bracket"></i> Sign In
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
              }
              to="/signup"
            >
              <i class="fa-solid fa-user-plus"></i> Sign Up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
