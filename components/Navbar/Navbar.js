// import React, { useState, useContext } from "react";
// import { NavLink, useHistory } from "react-router-dom";
import { RiMovieLine } from "react-icons/ri";
import Link from "next/link";
import styles from "./Navbar.module.css";
const Navbar = (props) => {
  const onSearchHandler = () => {
    props.setToggleSearch((prevState) => {
      // if (!prevState) {
      //   props.setCurrentLocation(history.location.pathname);
      // }
      return true;
    });
  };
  return (
    <header className={styles.navContainer}>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/movie">
              <a>
                <RiMovieLine size={30} color="white" />
              </a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/tv">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                  <polyline points="17 2 12 7 7 2"></polyline>
                </svg>
              </a>
            </Link>
          </li>
          <li className={styles.navItem} onClick={onSearchHandler}>
            <a className={styles.searchButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
