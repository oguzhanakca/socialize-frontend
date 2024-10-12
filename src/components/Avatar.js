import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45 }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        alt="avatar"
        src={src}
        height={height}
        width={height}
      />
    </span>
  );
};

export default Avatar;
