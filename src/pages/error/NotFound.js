import React from "react";
import styles from "../../styles/NotFound.module.css";

function NotFound() {
  return (
    <div className={`${styles.Page} d-flex flex-column mt-5 text-center`}>
      <h2 className={styles.Head}>404</h2>
      <h3 className={styles.Description}>The Page Not Found</h3>
      <h4 className="fs-5">Please navigate using the navbar.</h4>
    </div>
  );
}

export default NotFound;
