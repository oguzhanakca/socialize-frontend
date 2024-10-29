import React from "react";
import styles from "../../styles/NotFound.module.css";

function NotFound() {
  return (
    <div className={`${styles.Page} d-flex flex-column mt-5 text-center`}>
      <h2 className={styles.Head}>404</h2>
      <h3 className={styles.Description}>The Page Not Found</h3>
    </div>
  );
}

export default NotFound;
