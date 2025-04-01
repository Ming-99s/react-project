import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import useAxois from "../hook/useAxois";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../redux/action";
import '../style/Question.css';
import { decode } from 'html-entities';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const backgroundColorBox = ['#0057FF', '#FF3131', '#00C851', '#8D3DAF'];

function Question() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    Question_category,
    Question_difficulty,
    Question_type,
    amount_of_Question,
    score
  } = useSelector((state) => state);

  let apiUrl = amount_of_Question && Question_category && Question_difficulty && Question_type
    ? `/api.php?amount=${amount_of_Question}&category=${Question_category}&difficulty=${Question_difficulty}&type=${Question_type}`
    : null;

  if (!apiUrl) {
    return (
      <Box mt={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <Typography fontWeight="bold" color="red" fontSize='30px'>Please fill all the filters to fetch questions.</Typography>
        <Box width='20%' mt={3}>
          <Button fullWidth variant="contained" sx={{ backgroundColor: '#FFA500' }} onClick={() => navigate('/setting')}>Back</Button>
        </Box>
      </Box>
    );
  }

  const { response, loading } = useAxois({ url: apiUrl });
  const [indexQuestion, setQIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [correctAnswer, setCorrectAnswer] = useState(null); // Track correct answer

  const handleNextQ = (selectedOption) => {
    const question = response.results[indexQuestion];
    setSelectedAnswer(selectedOption);
    setCorrectAnswer(question.correct_answer);

    // Delay before moving to the next question
    setTimeout(() => {
      if (selectedOption === question.correct_answer) {
        dispatch(handleScoreChange(score + 1));
      }

      if (indexQuestion + 1 < response.results.length) {
        setQIndex(indexQuestion + 1);
        setSelectedAnswer(null); // Reset for the next question
        setCorrectAnswer(null);
      } else {
        navigate('/Result');
      }
    },2000); // Show correct answer for 1 second before moving on
  };

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[indexQuestion];
      let answerOptions = [...question.incorrect_answers];
      answerOptions.splice(getRandomInt(answerOptions.length), 0, question.correct_answer);
      setOptions(answerOptions);
    }
  }, [response, indexQuestion]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#FFA500' }} />
      </Box>
    );
  }

  return (
    <div className="heroBackground">
      <Box sx={{ backgroundColor: 'white', minWidth: '80%', width: '50%', padding: '40px', borderRadius: '10px' }}>
        <Typography variant="h5" fontWeight="bold">Question {indexQuestion + 1}</Typography>
        <Box mt={2} sx={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
          <Typography fontSize="20px">{decode(response.results[indexQuestion].question)}</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2} mt={2} sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleNextQ(option)}
                variant="contained"
                sx={{
                  py: 2,
                  backgroundColor:
                    selectedAnswer !== null
                      ? option === correctAnswer
                        ? "#00A86B" // ✅ Correct answer (always green)
                        : option === selectedAnswer
                          ? "#D72638" // ❌ Selected wrong answer (red)
                          : "#ccc" // 🔘 Other options turn gray
                      : backgroundColorBox[index % backgroundColorBox.length], // Default colors before selection
                  transition: "background-color 0.3s ease",
                  color: "white"
                }}
              >
                {decode(option)}
              </Button>

            ))}
          </Grid>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Score: {score}/{response.results.length}</Typography>
      </Box>
    </div>
  );
}

export default Question;
