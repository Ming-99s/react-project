import { Typography ,Box} from "@mui/material"
import { useSelector } from "react-redux"


function Result() {
  // const dispatch = useDispatch()
  const {score} = useSelector(state => state)
  return (
    <Box>
      <Typography fontWeight='bold' variant="h2" mt={2}>Your Result Result</Typography>
      <Typography fontWeight='bold' variant="h3">Score :{score}</Typography>
    </Box>
  )
}

export default Result