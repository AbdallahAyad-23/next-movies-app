import React from "react";
import styles from "./ListItem.module.css";
const ListItem = ({ title, data }) => {
  if (!data) return null;
  return (
    <li className={styles.listItem}>
      <p>{title}</p>
      <p>{data}</p>
    </li>
  );
};

export default ListItem;
