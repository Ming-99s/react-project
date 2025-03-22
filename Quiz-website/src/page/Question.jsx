import { Box, Typography,Button, CircularProgress } from "@mui/material"
import useAxois from "../hook/useAxois";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleScoreChnage } from "../redux/action";

const getRandomInt = (max) =>{
  return Math.floor(Math.random() * Math.floor(max));
}


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
      <Box mt={3}>
        <Typography fontWeight="bold" color="red">Please fill all the filters to fetch questions.</Typography>
      </Box>
    );
  }
  const {response,loading} = useAxois({url:apiUrl});
  const [indexQusetion ,setQIndex] = useState(0);
  const [options,setOption] = useState([]);
  console.log(options);

  const handleNextQ = (e) =>{
    const question = response.results[indexQusetion];
    if(e.target.textContent === question.correct_answer){
      dispatch(handleScoreChnage(score +1));
    }

    if(indexQusetion + 1 < response.results.length){
      setQIndex(indexQusetion +1);
    }
    else{
      navigator('/Result')
    }
  }

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
      <Box mt={5}>
        <CircularProgress></CircularProgress>
      </Box>
    )
  }

  if(response){

  return (
    <Box>
      <Typography variant="h3">Question {indexQusetion + 1}</Typography>
      <Typography mt={5}>{response.results[indexQusetion].question}</Typography>
      {options.map((option, index) => (
          <Box mt={2} key={index}>
            <Button onClick={handleNextQ} variant="contained">{option}</Button>
          </Box>
        ))}
      <Box mt={4}>Score:{score}/{response.results.length}</Box>
      

    </Box>
  )
}
}

export default Question