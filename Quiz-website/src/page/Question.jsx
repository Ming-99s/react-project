import { Box, Typography,Button, CircularProgress,Grid } from "@mui/material"
import useAxois from "../hook/useAxois";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleScoreChange} from "../redux/action";
import '../style/Question.css'
import {decode} from 'html-entities';

const getRandomInt = (max) =>{
  return Math.floor(Math.random() * Math.floor(max));
}

const backgroundColorBox =[
  '#0057FF','#FF3131','#00C851','#8D3DAF'
]

function Question() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const{
    Question_category,
    Question_difficulty,
    Question_type,
    amount_of_Question,
    score
  }= useSelector((state) => state);
  
  console.log(Question_category,Question_difficulty,Question_type,amount_of_Question);

  let apiUrl = amount_of_Question && Question_category && Question_difficulty && Question_type ? 
  `/api.php?amount=${amount_of_Question}&category=${Question_category}&difficulty=${Question_difficulty}&type=${Question_type}`
  :null;
  console.log(apiUrl)
  if (!apiUrl) {
    return (
      <Box mt={3} sx={{display:'flex',flexDirection:'column', justifyContent:'center' ,alignItems:'center', height:'90vh'}} >
        <Typography fontWeight="bold" color="red" fontSize='30px'>Please fill all the filters to fetch questions.</Typography>
        <Box width='20%' mt={3}>
          <Button fullWidth variant="contained" sx={{backgroundColor:'#FFA500'}} onClick={()=>navigator('/setting')}>Back</Button>
        </Box>
      </Box>
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {response,loading} = useAxois({url:apiUrl});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [indexQusetion ,setQIndex] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [options,setOption] = useState([]);
  console.log(options);

  const handleNextQ = (e) =>{
    const question = response.results[indexQusetion];
    if(e.target.textContent === question.correct_answer){
      dispatch(handleScoreChange(score +1));
    }

    if(indexQusetion + 1 < response.results.length){
      setQIndex(indexQusetion +1);
    }
    else{
      navigator('/Result')
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    if(response?.results.length){
      const question = response.results[indexQusetion];
      let answer = [...question.incorrect_answers];
      answer.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOption(answer);
    }
  },[response, indexQusetion]);

  console.log(response);
  if(loading){
     return(
                <Box sx={{display:'flex', justifyContent:'center' ,alignItems:'center', height:'100vh'}}>
                <CircularProgress sx={{ color: '#FFA500' }} />
            </Box>
            )
}

  if(response){

  return (
    <div className="heroBackground">
      <Box sx={{backgroundColor:'white' ,minWidth:'80%',width:'50%', padding:'40px', borderRadius:'10px'}}>
      <Typography variant="h5" fontWeight='bold'>Question {indexQusetion + 1}</Typography>
          <Box mt={2} sx={{backgroundColor:'white', padding:'10px',borderRadius:'10px'}}>

            <Typography fontSize='20px' >{decode(response.results[indexQusetion].question)}</Typography>
          </Box>
          <Box sx={{width:'100%'}}>

            <Grid 
              container 
              spacing={2} 
              mt={2} 
              sx={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(2, 1fr)", // Ensures two columns
                gap: 2, // Adds spacing between items
              }}
            >
              {options.map((option, index) => (
        <Button
          key={index}
          onClick={handleNextQ}
          variant="contained"
          sx={{
            py: 2,
            backgroundColor: backgroundColorBox[index % backgroundColorBox.length], // Cycling colors
          }}
        >
          {decode(option)}
        </Button>
              ))}
          </Grid>

          </Box>


      </Box>
      <Box mt={4}><Typography variant="h6">Score:{score}/{response.results.length}</Typography></Box>

      

    </div>
  )
}
}

export default Question