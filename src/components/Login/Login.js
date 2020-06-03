import React, { useState } from "react";
import axios from "axios"
import { generateCode, verifyCode } from "../../api/api";
import { useDispatch } from "react-redux";
import {
    login,
} from "../../features/user/userSlice";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

const Login = () => {
    const dispatch = useDispatch();
    const [getCode, setCode] = useState("");
    const [dialogOpened, setDialogOpened] = useState(false);
    const [errorOpened, setErrorOpened] = useState(false);

    const handleLogIn = event => {
        event.preventDefault();

        axios.get(generateCode)
            .then(res => {
                const data = res.data;
                return data;
            })
            .then(data => {
                if (data.status === "success") {
                    setDialogOpened(true);
                } else {
                    setErrorOpened(true);
                }
            })
            .catch(() => {
                console.log("request denied");
                setErrorOpened(true);
            });
    };
    const handleInputCode = event => {
        const value = event.target.value;
        if (value.length <= 6) {
            setCode(event.target.value);
        }
    };

    const submitLogin = event => {
        axios.get(verifyCode, { headers: { code: getCode } })
            .then(res => res.data)
            .then(({data, status}) => {
                if (status === "success") {
                    setDialogOpened(false);

                    dispatch(login({
                        code: getCode,
                        nickname: data.clientNickname,
                        uid: data.clientUid,
                        dbid: data.clientDbid
                    }));

                    console.log(`successfully verified client ${data.clientNickname}`);
                } else {
                    console.log(data.status)
                }
            })
            .catch((e) => console.log("Cant be verified", e))
    };

    return (
        <>
            <Button variant="outlined" color="inherit" onClick={handleLogIn}>
                Login
            </Button>
            <Dialog open={dialogOpened} onClose={() => setDialogOpened(false)} aria-labelledby="login-dialog">
                <DialogTitle id="form-dialog-title">Log in</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You need to be logged into server to get poke message.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Code"
                        type="text"
                        fullWidth
                        value={getCode}
                        onChange={handleInputCode}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpened(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => submitLogin()} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={errorOpened} onClose={() => setErrorOpened(false)} aria-labelledby="error-dialog">
                <DialogTitle id="form-dialog-title">Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Can't find client on server! <br/>
                        You need to be logged into server to get poke message. <br/>
                        Please log into server or try again later.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setErrorOpened(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default Login