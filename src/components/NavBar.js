import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignout = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
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
        <i class="fa-solid fa-square-plus"></i> Add Post
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/notifications"
      >
        <i class="fa-solid fa-bell"></i> Notifications
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/liked"
      >
        <i class="fa-solid fa-heart"></i> Liked
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={35} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/"
        onClick={handleSignout}
      >
        <i class="fa-solid fa-right-from-bracket"></i> Sign Out
      </NavLink>
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
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
