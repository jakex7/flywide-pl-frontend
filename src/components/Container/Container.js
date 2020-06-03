import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Assigner from "../Assigner/Assigner";
import { logout, selectCode, selectIsLogged } from "../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {gaCode, serverInfo, verifyCode} from "../../api/api";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import News from "../News/News";
import styles from "./Container.module.scss"
import Status from "../Status/Status";
import Footer from "../Footer/Footer";
import Info from "../Info/Info";
import ReactGA from "react-ga";

const Container = () => {
    const [getClientsOnline, setClientsOnline] = useState(0);
    const [getClientsMax, setClientsMax] = useState(0);
    const [getAdminsStatus, setAdminsStatus] = useState([]);
    const [getClientInfo, setClientInfo] = useState({});

    const dispatch = useDispatch();
    const code = useSelector(selectCode);
    const isLogged = useSelector(selectIsLogged);

    useEffect(() => {
        ReactGA.initialize(gaCode);

        const verify = async () => {
            await axios.get(verifyCode, { headers: { code: code } })
                .then(res => res.data)
                .then(({data, status}) => {
                    if (status !== "success") {
                        dispatch(logout());
                    } else {
                        setClientInfo(data);
                    }
                })
                .catch(() => dispatch(logout()))
        };
        const serverStatus = async () => {
            await axios.get(serverInfo)
                .then(res => {
                    const data = res.data;
                    return data;
                })
                .then(data => {
                    if (data.status === "success") {
                        setClientsOnline(data.data.clientsOnline);
                        setClientsMax(data.data.clientsMax);
                        setAdminsStatus(data.data.admins);
                        return data.data;
                    } else {
                        console.log("request denied");
                    }
                })
                .catch(() => {
                    console.log("request denied");
                });
        };

        verify();
        serverStatus();
    }, [code, dispatch]);

    return (
        <Router>
            <NavBar clientsOnline={getClientsOnline} clientsMax={getClientsMax} />
            <div className={styles.grey}>
                <Switch>
                    <PrivateRoute path="/assigner" isLogged={isLogged}>
                        <div className={styles.container}>
                            <Assigner/>
                        </div>
                    </PrivateRoute>
                    <PrivateRoute path="/user" isLogged={isLogged}>
                        <div className={styles.container}>
                            <Info clientInfo={getClientInfo}/>
                        </div>
                    </PrivateRoute>
                    <Route path="/">
                        <div className={styles.container}>
                            <News/>
                            <Status adminsStatus={getAdminsStatus} />
                        </div>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </Router>
    )
};

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                rest.isLogged
                    ? (children)
                    : (<Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />)
            }
        />
    );
}

export default Container;