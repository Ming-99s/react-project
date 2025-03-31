import React from 'react'
import SelectBox from '../components/selectBox'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import NumbeCom from '../components/NumbeCom'
import useAxois from '../hook/useAxois'
import { useNavigate} from 'react-router-dom'
import '../style/setting.css'
function Setting() {
    const navigate = useNavigate();

    function handleClick(){
        navigate('/question');
    }
    const {response ,loading ,error} = useAxois({url: "/api_category.php"})

    console.log(response)
    if(loading){
        return(
            <Box sx={{display:'flex', justifyContent:'center' ,alignItems:'center', height:'100vh'}}>
            <CircularProgress sx={{ color: '#FFA500' }} />
        </Box>
    )
}
if(error){
    return(
        <Box mt={10} sx={{display:'flex', justifyContent:'center' ,alignItems:'center'}}>
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
    <div className='heroBox'>

    <Box component='img' src='/image/logo.png' width='15%' ></Box>
        <div className='container'>
            <SelectBox label="Category" options={response.trivia_categories} ></SelectBox>
            <SelectBox label="Difficulty" options={DifficultyOp}></SelectBox>
            <SelectBox label="Type" options={Type}></SelectBox>
            <NumbeCom label="Amount of Question"></NumbeCom>

            <Box mt={3}>
        	    <Button fullWidth variant='contained' type='submit' onClick={handleClick} sx={{backgroundColor:'#FFA500'}}>Get Started</Button>
            </Box>

        </div>
    </div>
    </>
  

  )
}
}

export default Setting