import { FormControl, TextField,Box } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { handleAmountChange } from '../redux/action';

function NumbeCom(props) {
    const dispatch = useDispatch();

    const handleChange = (e) =>{
        dispatch(handleAmountChange(e.target.value))
    }
    
  return (
    <Box mt={2}>
        <FormControl fullWidth>
            <TextField
                onChange={handleChange}
                variant='outlined'
                label={props.label}
                type="number"
                size="small"
            />
                
        </FormControl>
    </Box>
  )
}

export default NumbeCom