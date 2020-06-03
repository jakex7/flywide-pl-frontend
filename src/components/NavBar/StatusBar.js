import React from "react";
import styles from "./NavBar.module.scss";
import AppBar from "@material-ui/core/AppBar";

const StatusBar = ({isLogged, nickname, clientsOnline, clientsMax}) => {
    return (
        <AppBar position="static" color="inherit" className={styles.statusbar}>
            <span className={styles.container}>
                Online: &nbsp; {clientsOnline} / {clientsMax}
            </span>
        </AppBar>
    );
};

export default StatusBar;