import React from 'react';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';

const SingleChip = (props) => {
    const [isSelected, setIsSelected] = React.useState(props.chipState);
    return(
        <>
            <Chip
                color={isSelected ? "primary" : "default"}
                label={props.label}
                onClick={() => {
                    setIsSelected(!isSelected)
                    if(isSelected){
                        props.handlerDelete(props.label)
                    }else{
                        props.handlerSelect(props.label)
                    }
                }}
                deleteIcon={isSelected ? <CancelIcon/> :<></>}
                onDelete={() => {
                    setIsSelected(false)
                    props.handlerDelete(props.label)
                }}
            />
        </>
    )
}

export default SingleChip;