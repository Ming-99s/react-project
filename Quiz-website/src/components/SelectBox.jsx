import React, { useState } from 'react'
import { FormControl,InputLabel,Box, Select, MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux';
import { handleCategoryChnage, handleDifficultyChange, handleTypeChnage } from '../redux/action';
function SelectBox(props) {

    const dispatch = useDispatch();
    const  [value, setValue] = useState("");
    const handleChange = (e) =>{
        e.preventDefault();
        setValue(e.target.value);
        switch(props.label){
            case "Category":
                dispatch(handleCategoryChnage(e.target.value));
                break;
            case "Difficulty":
                dispatch(handleDifficultyChange(e.target.value));
                break;
            case "Type":
                dispatch(handleTypeChnage(e.target.value));
                break;
            default:
                return;
        }
    }
    return (
    <Box mt={2}>
        <FormControl size='small' fullWidth>
            <InputLabel>{props.label}</InputLabel>
                <Select value={value} label={props.label} onChange={handleChange} >
                    {props.options.map(({id,name})=>(
                        <MenuItem value={id} key={id}>{name}</MenuItem>
                    ))}
                </Select>

        </FormControl>
    </Box>
  )
}

export default SelectBox