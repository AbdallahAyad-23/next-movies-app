import { useEffect, useState } from "react";
import styles from "../styles/Layout.module.css";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./SearchBar/SearchBar";
const Layout = ({ children }) => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const closeSearch = () => {
    if (toggleSearch && children.type.name !== "Results")
      setToggleSearch(false);
  };
  useEffect(() => {
    closeSearch();
  }, [children]);

  return (
    <div className="layout">
      <Navbar setToggleSearch={setToggleSearch} />
      <SearchBar
        toggleSearch={toggleSearch}
        setToggleSearch={setToggleSearch}
      />
      <div className={styles.container} onClick={closeSearch}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
