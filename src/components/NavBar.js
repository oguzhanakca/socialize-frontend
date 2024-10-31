import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import Dropdown from "react-bootstrap/Dropdown";
import { removeTokenTimestamp } from "../utils/utils";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const secured_profile_image = currentUser?.profile_image.replace("http://", "https://");
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignout = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate("/");
    } catch (err) {
      // console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/"
      >
        <i className="fa-solid fa-house"></i>{" "}
        <span className="d-none d-md-inline">Home</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/chats"
      >
        <i className="fa-solid fa-message"></i>{" "}
        <span className="d-none d-md-inline">Chat</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to={`/profiles/${currentUser?.profile_id}/followers/`}
      >
        <i className="fa-solid fa-user-group"></i>{" "}
        <span className="d-none d-md-inline">Followers</span>
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

      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/posts/create"
      >
        <i className="fa-solid fa-square-plus"></i>{" "}
        <span className="d-none d-md-inline">Add Post</span>
      </NavLink>

      <Dropdown align="end">
        <Dropdown.Toggle as={NavLink} className={`${styles.NavLink}`}>
          <Avatar
            src={secured_profile_image}
            text="Profile"
            height={35}
            id={currentUser?.pk}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.ProfileDropdown}>
          <Dropdown.Item
            as={Link}
            to={`/profiles/${currentUser?.profile_id}`}
            className={styles.ProfileDropdownItem}
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to={`/profiles/${currentUser?.profile_id}/edit`}
            className={styles.ProfileDropdownItem}
          >
            Edit Profile
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to={`/profiles/${currentUser?.profile_id}/settings`}
            className={styles.ProfileDropdownItem}
          >
            Settings
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.ProfileDropdownItem}
            onClick={handleSignout}
          >
            Sign Out
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
        to="/"
      >
        <i className="fa-solid fa-house"></i>{" "}
        <span className="d-none d-md-inline">Home</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/signin"
      >
        <i className="fa-solid fa-right-to-bracket"></i>{" "}
        <span className="d-none d-md-inline">Sign In</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          styles.NavLink + (isActive ? ` ${styles.NavLinkActive}` : "")
        }
        to="/signup"
      >
        <i className="fa-solid fa-user-plus"></i>{" "}
        <span className="d-none d-md-inline">Sign Up</span>
      </NavLink>
    </>
  );
  return (
    <Navbar expanded={expanded} className={styles.NavBar} id="navbar">
      <Container>
        <h1 className={styles.Brand}>Socialize</h1>
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
