import React from "react";
import styles from "./css/Header.module.css";

const Header = () => {
    return (
        <header className={styles.container}>
            <p className={styles.heading}>PDF-TO-WORD</p>
        </header>
    );
};

export default Header;
