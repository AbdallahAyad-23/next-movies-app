import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Layout.module.css";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./SearchBar/SearchBar";
const Layout = ({ children }) => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const router = useRouter();
  const closeSearch = () => {
    setToggleSearch(false);
  };
  useEffect(() => {
    if (router.pathname !== "/search/[query]" && toggleSearch) {
      closeSearch();
    }
  }, [router]);
  return (
    <div className="layout">
      <Navbar setToggleSearch={setToggleSearch} />
      <SearchBar
        toggleSearch={toggleSearch}
        setToggleSearch={setToggleSearch}
      />
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Layout;
