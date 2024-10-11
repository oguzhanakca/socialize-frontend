import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { useContext } from "react";
import { CurrentUserContext } from "../App";

function NavBar() {
  const currentUser = useContext(CurrentUserContext);
  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
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
    </>
  );
  return (
    <Navbar expand="md" className={styles.NavBar} id="navbar">
      <Container fluid>
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
              to="/"
            >
              <i class="fa-solid fa-right-to-bracket"></i> Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
