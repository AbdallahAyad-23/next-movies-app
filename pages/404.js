import styles from "../styles/Custom404.module.css";
export default function Custom404({ message }) {
  return (
    <div className={styles.page}>
      <h1>{message || "404 - Page Not Found"}</h1>
    </div>
  );
}
