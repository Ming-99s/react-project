import React from 'react'
import SelectBox from '../components/selectBox'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import NumbeCom from '../components/NumbeCom'
import useAxois from '../hook/useAxois'
import { useNavigate} from 'react-router-dom'

function Setting() {
    const navigate = useNavigate();

    function handleClick(){
        navigate('/question');
    }
    const {response ,loading ,error} = useAxois({url: "/api_category.php"})

    console.log(response)
    if(loading){
        return(
            <Box mt={10}>
            <CircularProgress />
        </Box>
    )
}
if(error){
    return(
        <Box mt={10}>
            <Typography variant='h3' fontWeight='bold' color='red' >You are Cooked🤡</Typography>
            <Typography variant='p' fontSize={20} color='black' >Somthing went Wrong</Typography>

        </Box>
    )
}
const DifficultyOp = [
    {id:'easy' , name:'Easy'},
    {id:'medium' , name:'Medium'},
    {id:'hard' , name:'Hard'}
]
const Type = [
    {id:"multiple",name:"Multiple Choice"},
    {id:"boolean",name:"True / False"}
]
  if(response){
  
  return (
    <>
        <SelectBox label="Category" options={response.trivia_categories} ></SelectBox>
        <SelectBox label="Difficulty" options={DifficultyOp}></SelectBox>
        <SelectBox label="Type" options={Type}></SelectBox>
        <NumbeCom label="Amount of Question"></NumbeCom>

        <Box mt={3}>
    	    <Button fullWidth variant='contained' type='submit' onClick={handleClick}>Get Started</Button>
        </Box>
    </>
  

  )
}
}

export default Setting