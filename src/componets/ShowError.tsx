import React from "react"
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {setErrorAppAC} from "../state/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const ShowError = () => {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(setErrorAppAC(null))
    };

    return (
        <Stack spacing={2} sx={{width: "30%"}}>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: "100%"}}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
