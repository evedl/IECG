import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { blue,red } from '@mui/material/colors';
import {CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DeleteIcon from '@mui/icons-material/Delete';
import 'moment/locale/es';
import moment from 'moment';

export default function TrayectoriaCard(props) {
    let customStyles
    if(props.card){
        customStyles ={
            margin:30,
            borderColor:blue[500]
        }
    }else{
        customStyles ={
            border: "none",
            boxShadow: "none",
            marginBottom: 22
        }
    }

    moment.locale('es');
    return (
        <Card style={customStyles}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        {props.icon?props.icon:<EmojiEventsIcon/>}
                    </Avatar>
                }
                action={
                <>
                    {props.deleteHandler && (
                        <IconButton onClick={()=>{
                            props.deleteHandler(props.id)}
                        } sx={{ color: red[500] }} aria-label="settings">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </>
                }
                title={props.title}
                subheader={moment(props.start).format("LL")+"-"+moment(props.end).format("LL")}
            />
            <CardContent>
                <Typography>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
