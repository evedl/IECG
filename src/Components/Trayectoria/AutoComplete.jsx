import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const AutoCompleteComp = (props) => {
    return (
        <Autocomplete
            disablePortal
            id="combo-box"
            options={props.options}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Municipio" onSelect={(e)=>{props.handler(e)}} />}
        />
    );
}

export default AutoCompleteComp;