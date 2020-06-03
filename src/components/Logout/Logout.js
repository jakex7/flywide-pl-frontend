import React  from "react";
import { useDispatch } from "react-redux";
import {
    logout,
} from "../../features/user/userSlice";

import Button from "@material-ui/core/Button";

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogOut = event => {
        event.preventDefault();
        dispatch(logout());
    };

    return (
        <Button variant="outlined" color="inherit" onClick={handleLogOut}>
            Logout
        </Button>
    )
};

export default Logout