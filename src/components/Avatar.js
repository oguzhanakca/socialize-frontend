import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, id }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        alt={id}
        src={src}
        height={height}
        width={height}
      />
    </span>
  );
};

export default Avatar;
