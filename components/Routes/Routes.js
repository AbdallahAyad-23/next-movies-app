import React from "react";
import styles from "./Routes.module.css";
const Routes = ({ children }) => {
  return <div className={styles.routes}>{children}</div>;
};

export default Routes;
