import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector} from "react-redux";
import {setTrayectoria} from "../../Features/Profile/ProfileSlice";

export default function LoadingButtonCom(props) {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.feedback.isLoading);
    return (
        <Stack direction="row" spacing={2}>
            <LoadingButton
                fullWidth
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={() => {
                    props.fun(props.funargs)
                    dispatch(setTrayectoria({
                        action:'Clean',
                    }))
                }}
            >
                {props.text}
            </LoadingButton>
        </Stack>
    );
}
