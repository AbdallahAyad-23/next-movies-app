import styles from "./Spinner.module.css";
const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
