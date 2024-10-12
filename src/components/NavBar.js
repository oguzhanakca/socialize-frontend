import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { Dropdown } from "react-bootstrap";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignout = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/posts/create"
      >
        <i className="fa-solid fa-square-plus"></i>{" "}
        <span className="d-none d-md-inline">Add Post</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/liked"
      >
        <i className="fa-solid fa-heart"></i>{" "}
        <span className="d-none d-md-inline">Liked</span>
      </NavLink>

      <Dropdown align="end">
        <Dropdown.Toggle
          as={NavLink}
          id="dropdown-profile"
          className={`${styles.NavLink}`}
        >
          <Avatar src={currentUser?.profile_image} text="Profile" height={35} />
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.ProfileDropdown}>
          <Dropdown.Item
            as={NavLink}
            to={`/profiles/${currentUser?.profile_id}`}
            className={styles.ProfileDropdownItem}
          >
            <i className="fa-solid fa-user"></i> Profile
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.ProfileDropdownItem}
            onClick={handleSignout}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/signin"
      >
        <i class="fa-solid fa-right-to-bracket"></i>{" "}
        <span className="d-none d-md-inline">Sign In</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/signup"
      >
        <i class="fa-solid fa-user-plus"></i>{" "}
        <span className="d-none d-md-inline">Sign Up</span>
      </NavLink>
    </>
  );
  return (
    <Navbar expanded={expanded} className={styles.NavBar} id="navbar">
      <Container>
        <NavLink className={styles.Brand} to="/">
          Socialize
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="text-end">
          <Nav className="ms-auto">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
