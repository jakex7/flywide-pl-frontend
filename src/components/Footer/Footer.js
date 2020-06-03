import React from "react";
import styles from "./Footer.module.scss"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import securebizneshost from "./logo-secure_min.png"

const Footer = () => (
    <footer>
        <div className={styles.partnersContainer}>
            <h3 className={styles.header}>Partners</h3>
            <ul>
                <li>
                    <a href="https://securebizneshost.eu/">
                        <img src={securebizneshost} alt="securebizneshost" />
                    </a>
                </li>
                <li>
                    <a href="https://jakubgrzywacz.pl/">
                        Jakub<br />Grzywacz
                    </a>
                </li>
            </ul>
        </div>
        <AppBar position="static" color="inherit" className={styles.footer}>
            <Toolbar className={styles.container}>
                <span>
                    Made&nbsp;with&nbsp;
                    <span role="img" aria-label="heart">❤️</span>&nbsp;
                    by&nbsp;
                    <a
                        href="https://jakubgrzywacz.pl/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Jakub Grzywacz</a> &nbsp;
                    / &nbsp;
                    {new Date().getFullYear()}
                </span>
            </Toolbar>
        </AppBar>
    </footer>
);

export default Footer;