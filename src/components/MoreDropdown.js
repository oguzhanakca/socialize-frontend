import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import NavLink from "react-router-dom";

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as={NavLink}
        className={`${styles.Dropdown}`}
        aria-label="Settings"
      >
        <i className="fa-solid fa-gear"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.Menu}>
        <Dropdown.Item
          onClick={handleEdit}
          aria-label="edit"
          className={styles.DropdownItem}
        >
          <i className="fas fa-edit" /> Edit
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleDelete}
          aria-label="delete"
          className={styles.DropdownItem}
        >
          <i className="fas fa-trash-alt" /> Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
