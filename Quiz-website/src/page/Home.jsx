import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  function handleChange(){
    navigate('/setting');
  }
  return (
    <>
    <Typography variant='h1' mb={3}>Home Page</Typography>
      <Button onClick={handleChange} fullWidth variant='contained'>
        Click me UwU
      </Button>
    </>
    
  )
}

export default Home