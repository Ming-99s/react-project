import { Typography ,Box,Button} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { handleReset } from "../redux/action";


function Result() {
  const dispatch = useDispatch()
  const navigator = useNavigate();


  const handleClick =() =>{
    navigator('/setting')
    dispatch(handleReset());
  }
  const {score , amount_of_Question} = useSelector(state => state)
  return (
    <Box textAlign='center' height='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Typography fontWeight='bold' variant="h2">Your Result</Typography>
      <Typography fontWeight='bold' variant="h3" >Score : {score} / {amount_of_Question}</Typography>
      <Box mt={3} width='50%' >
        <Button fullWidth variant='contained' type='submit' onClick={handleClick} sx={{backgroundColor:'#FFA500'}}>
            <Typography fontWeight='bold'>Back to Quiz</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default Result