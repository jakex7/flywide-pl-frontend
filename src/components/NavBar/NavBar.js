import React  from "react";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import {
    selectIsLogged,
    selectNickname
} from "../../features/user/userSlice";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styles from "./NavBar.module.scss";
import StatusBar from "./StatusBar";

const NavBar = ({clientsOnline, clientsMax}) => {
    const isLogged = useSelector(selectIsLogged);
    const nickname = useSelector(selectNickname);

    return (
        <>
            <StatusBar nickname={nickname} isLogged={isLogged} clientsOnline={clientsOnline} clientsMax={clientsMax} />
            <AppBar position="static" color="inherit" className={styles.navBar}>
                <Toolbar className={styles.container}>
                    <Typography variant="h6" noWrap style={{flexGrow: 1}}>
                        <Link to="/" className={styles.link}>
                            Flywide
                        </Link>
                    </Typography>
                    <div>
                        <Link to="/user" className={styles.link}>
                            Client Info
                        </Link>
                        <Link to="/assigner" className={styles.link}>
                            Assigner
                        </Link>
                        {
                            isLogged
                                ? <Logout/>
                                : <Login/>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
};

export default NavBar;